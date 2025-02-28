exports.info = {
    title: 'catbox',
    path: '/catbox',
    desc: '',
    example_url: [
      {
        method: 'GET',
        query: '/catbox?url=',
        desc: 'upload',
      }
    ],
};

exports.methods = {
    get: async function (req, res) {
        try {
            const FormData = await import('form-data').then(mod => mod.default);
            const axios = await import('axios').then(mod => mod.default);
            const mimeTypes = await import('mime-types').then(mod => mod.default);

            if (!/^https:\/\//.test(req.query.url)) {
                return res.json({
                    error: 'query "url" invalid',
                });
            }

            const file = await axios({
                method: 'GET',
                url: req.query.url,
                responseType: 'stream',
            });
            const ext = req.query.ext || mimeTypes.extension(file.headers['content-type']);

            file.data.path = 'tmp.' + ext;

            const formdata = new FormData();
            formdata.append('reqtype', 'fileupload');
            formdata.append('fileToUpload', file.data);

            const hash = ''; // You can add a user hash if needed
            if (hash) formdata.append('userhash', hash);

            const link = (await axios({
                method: 'POST',
                url: 'https://catbox.moe/user/api.php',
                headers: formdata.getHeaders(),
                data: formdata,
                responseType: 'text',
            })).data;

            res.json({
                url: link,
            });
        } catch (e) {
            console.error(e);
            res.json({
                error: e.toString(),
            });
        }
    },
};
