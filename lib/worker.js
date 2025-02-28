const { workerData, parentPort } = require('node:worker_threads');

const fs = require("fs");

const FormData = require("form-data");

const axios = require("axios");

const main = async (prompt = "anime, 4k, high quality, hdr", style_id = 21, aspect_ratio = "1:1") => {

    const filename = await performMainProcessing(prompt, style_id, aspect_ratio);

    parentPort.postMessage(filename);

};

const performMainProcessing = async (prompt, style_id, aspect_ratio) => {

    console.log("Downloading...");

    const form = new FormData();

    const filename = process.cwd()+'/cache/' + Date.now() + Math.random() + ".png"; + ".png";

    form.append("model_version", "1");

    form.append("prompt", prompt);

    form.append("style_id", style_id); //28: v3, 29: v4, 30: v4(beta), anime: 21

    form.append("aspect_ratio", aspect_ratio);

    form.append("cfg", "9.5");

    const response = await sendRequest('post', 'https://inferenceengine.vyro.ai/sd', form);

    fs.writeFileSync(filename, response.data);

    const upscaleData = await upscale(fs.readFileSync(filename), filename);

    fs.writeFileSync(filename, upscaleData);

    console.log("Done");

    return filename;

};

const upscale = async (imageData, filename) => {

    console.log("Upscaling...");

    const form = new FormData();

    form.append("model_version", "1");

    form.append("image", imageData, {

        contentType: "image/png",

        filename: filename,

    });

    const response = await sendRequest('post', 'https://inferenceengine.vyro.ai/upscale', form);

    return response.data;

};

const sendRequest = async (method, url, data) => {

    const formHeaders = data.getHeaders();

    const headers = {

        'Accept': 'application/json',

        'Accept-Charset': 'UTF-8',

        'User-Agent': 'Ktor client',

        'Host': 'inferenceengine.vyro.ai',

        'Content-Type': `multipart/form-data; boundary=${data._boundary}`

    };

    const response = await axios({

        method,

        url,

        data,

        headers: {

        ...formHeaders,

        ...headers

        },

        responseType: 'arraybuffer'

    });

    return response;

};

main(workerData.prompt, workerData.style_id, workerData.aspect_ratio);
