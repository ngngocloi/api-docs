const fs = require('fs');
const path = require('path');

const videoFolderPath = path.join(__dirname, '../gai'); // Đường dẫn tới thư mục chứa video

const getRandomVideo = (req, res) => {
    fs.readdir(videoFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        const mp4Files = files.filter(file => path.extname(file) === '.mp4');
        if (mp4Files.length === 0) {
            return res.status(404).json({ error: 'No video files found' });
        }

        const randomFile = mp4Files[Math.floor(Math.random() * mp4Files.length)];
        const videoUrl = `${req.protocol}://${req.get('host')}/gai/${randomFile}`;

        res.json({ data: videoUrl });
    });
};

module.exports = {
    info: {
        path: '/gai',
        title: 'Random Video gái',
        desc: 'Get a random video URL from the video folder',
        example_url: [
            { method: 'get', query: '/gai', desc: 'Get a random video URL' }
        ]
    },
    methods: {
        get: getRandomVideo
    }
};
