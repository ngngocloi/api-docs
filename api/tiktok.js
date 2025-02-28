var fs = require("fs");
var cache = __dirname + "/../cache/";
var request = require("request").defaults({ jar: true });
var cheerio = require("cheerio");

var headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
    "Cache-Control": "max-age=0",
    "Priority": "u=0, i",
    "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"99\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
}

function getDataFromURL(url) {
    var callback;
    var rtPromise = new Promise(function (resolve, reject) {
        callback = (error, response) => error ? reject(error) : resolve(response);
    });

    request({ url, headers }, callback);

    return rtPromise;
}

function removeCache() {
    fs.readdirSync(cache).map(function (file) {
        var info = fs.statSync(cache + file);
        var age = Date.now() - info.ctimeMs;
        age >= 30 * 60 * 1000 ? fs.unlinkSync(cache + file) : null;
    });
}
setInterval(removeCache, 30 * 60 * 1000);

function createResponseDataVideo(resData) {
    var $ = cheerio.load(resData.body);
    var res = JSON.parse($("script[id=\"__UNIVERSAL_DATA_FOR_REHYDRATION__\"]").text())["__DEFAULT_SCOPE__"]["webapp.video-detail"]["itemInfo"]["itemStruct"];
    return {
        id: res.id,
        desc: res.desc,
        createTime: res.createTime,
        video: {
            height: res.video.height,
            width: res.video.width,
            duration: res.video.duration,
            ratio: res.video.ratio,
            cover: res.video.cover,
            originCover: res.video.originCover,
            dynamicCover: res.video.dynamicCover,
            playAddr: res.video.playAddr
        },
        author: res.author,
        music: res.music,
        stats: res.stats
    }
}

module.exports = {
    info: {
        path: "/tiktok/:feature",
        title: "TikTok",
        desc: "",
        example_url: [
            { 
                method: "GET",
                query: "/tiktok/details?url=https://vt.tiktok.com/ZSYfwSGuC/",
                desc: "Get video details TikTok" 
            }
        ]
    },
    methods: {
        get: async function (req, res) {
            var statusCode, responseData;
            var feature = req.params.feature;

            try {
                switch (feature) {
                    case "file":
                        var fileID = req.query.id;
                        var path = cache + fileID + ".mp4";
                        if (fs.existsSync(path)) {
                            var streamReader = fs.createReadStream(path);
                            res.status(200);
                            res.setHeader("Content-Type", "video/mp4");
                            return streamReader.pipe(res);
                        } else {
                            statusCode = 404;
                            responseData = {
                                error: "file is not exist"
                            }
                        }
                        break;
                    case "details":
                        var url = req.query.url;
                        if (url) {
                            url = url.split("?")[0];
                            if (!/^https:\/\/(www\.|m\.|vt\.|vm\.)?tiktok\.com\/(@[A-Za-z0-9_.]+\/(video|photo)\/\d+|(video|photo)\/\d+|Z[A-Za-z0-9]+\/?)$/.test(url)) {
                                statusCode = 403;
                                responseData = {
                                    error: "url is not accepted"
                                }
                            } else {
                                var resData = await getDataFromURL(url);
                                try {
                                    responseData = createResponseDataVideo(resData);
                                    var path = cache + responseData.id + ".mp4";
                                    function writer() {
                                        var rtPromise = new Promise(function (resolve, reject) {
                                            request({ url: responseData.video.playAddr, headers })
                                                .pipe(fs.createWriteStream(path))
                                                .on("error", reject)
                                                .on("close", resolve);
                                        });
                                    
                                        return rtPromise;
                                    }
                                    if (!fs.existsSync(path)) {
                                        await writer();
                                    }
                                    statusCode = 200;
                                    responseData.video.playAddr = req.protocol + "://" + req.get("host") + "/tiktok/file?id=" + responseData.id;
                                } catch (error) {
                                    /*var photoID = resData.body.split("\"canonical\":\"")[1].split("\"")[0].split("\\u002F").join("/").split("/").pop();
                                    var apiURL = "https://www.tiktok.com/api/item/detail/";
                                    var listQuery = {
                                        WebIdLastTime: Date.now(),
                                        aid: 1988,
                                        app_language:
                                    }*/
                                   throw error;
                                }
                            }
                        } else {
                            statusCode = 404;
                            responseData = {
                                error: "url is not found"
                            }
                        }
                        break;
                    default:
                        statusCode = 404;
                        responseData = {
                            error: "feature is not supported"
                        }
                        break;
                }
            } catch (error) {
                console.error(error);
                statusCode = 500;
                responseData = {
                    error: "fail when request to url"
                }
            }

            res.status(statusCode);
            return res.json(responseData);
        }
    }
}