exports.info = {
    title: 'imgur',
    path: '/imgur',
    desc: '',
    example_url: [
        {
            method: 'GET',
            query: '/imgur?url=',
            desc: 'upload',
        }
    ],
};

exports.methods = {
    get: async function (req, res) {
        try {
            const fetch = await import('node-fetch').then(mod => mod.default);
            const FormData = await import('form-data').then(mod => mod.default);

            let { url } = req.query;

            if (!/^https:\/\//.test(url)) {
                return res.json({
                    error: 'query "url" invalid',
                });
            }

            let d = new FormData();
            const response = await fetch(url);
            if (!response.ok) {
                return res.json({
                    error: 'Failed to fetch the URL'
                });
            }

            const buffer = Buffer.from(await response.arrayBuffer()).toString('base64');
            d.append(/(\.|)mp4/.test(url) ? 'video' : 'image', buffer);
            d.append('type', 'base64');

            const imgurResponse = await fetch('https://api.imgur.com/3/upload', {
                method: 'POST',
                headers: {
                    Authorization: 'Client-ID 0beb6e44d5c89f3',
                },
                body: d,
            });

            const json = await imgurResponse.json();
            res.json({
                url: json?.data?.link || json
            });
        } catch (e) {
            console.error(e);
            res.json({
                error: e.toString()
            });
        }
    },
};
