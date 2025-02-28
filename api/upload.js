"use strict";

const { existsSync, mkdirSync, createReadStream, createWriteStream, unlinkSync } = require("fs");
const path = require("path");
const source = path.join(__dirname, '/../uploads/');
const list_folder = ['image', 'text', 'video', 'audio'];

function checkExistsUploads() {
  if (!existsSync(source)) {
    mkdirSync(source);
  }
  
  for (let folder of list_folder) {
    const folderPath = path.join(source, folder);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }
  }
}
checkExistsUploads();

async function getFilePathFromSource(filename) {
  for (let folder of list_folder) {
    const filepath = path.join(source, folder, filename);
    if (existsSync(filepath)) {
      return filepath;
    }
  }
}

module.exports = {
  info: {
    path: '/upload/:file',
    title: 'Upload file',
    desc: 'upload file. giao diện trực quan: https://upload.duongkum999.tech',
    example_url: [
      { method: 'POST', query: '/upload/:file', desc: '' },
      { method: 'GET', query: '/upload/:file', desc: '' }
    ]
  },
  methods: {
    get: async function (req, res) {
      const filename = req.params.file;
      const pathfile = await getFilePathFromSource(filename);
      
      if (pathfile) {
        return res.download(pathfile);
      } else {
        return res.json({ error: "file is not found" });
      }
    },
    post: async function (req, res) {
      const filename = req.params.file;
      const ext = path.extname(filename).toLowerCase();
      const contentType = req.headers['content-type'];

      if (!filename) {
        return res.json({
          error: "ten file khong duoc de trong, phai gom ten file, vi du: text.txt"
        });
      }

      let sourceend = source;
      switch (ext) {
        case '.mp4':
        case '.avi':
        case '.mov':
        case '.mkv':
        case '.wmv':
        case '.flv':
        case '.webm':
        case '.mpeg':
        case '.3gp':
        case '.ogg':
          sourceend = path.join(source, 'video', filename);
          break;
        case '.txt':
        case '.js':
        case '.json':
        case '.md':
        case '.html':
        case '.css':
        case '.xml':
        case '.csv':
        case '.yaml':
        case '.ini':
          sourceend = path.join(source, 'text', filename);
          break;
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
        case '.bmp':
        case '.tiff':
        case '.tif':
        case '.svg':
        case '.webp':
        case '.heic':
        case '.zip':
        case '.psd':
          sourceend = path.join(source, 'image', filename);
          break;
        case '.mp3':
        case '.wav':
        case '.flac':
        case '.aac':
        case '.ogg':
        case '.wma':
        case '.alac':
        case '.m4a':
        case '.ac3':
        case '.pcm':
          sourceend = path.join(source, 'audio', filename);
          break;
        default:
          return res.json({ error: "unknown ext file" });
      }

      if (existsSync(sourceend)) {
        unlinkSync(sourceend);
      }

      const writeStream = createWriteStream(sourceend);
      req.pipe(writeStream);

      writeStream.on('finish', () => {
        return res.json({ url: `https://${req.get("host")}${req.originalUrl}` });
      });

      writeStream.on('error', (err) => {
        console.error(err);
        return res.status(500).json({ error: "Error writing file" });
      });
    }
  }
};
