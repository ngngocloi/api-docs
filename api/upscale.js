const fs = require("fs");
const { Worker } = require('node:worker_threads');
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");

const _c = process.cwd()+'/cache';

exports.info = {
  title: 'nét ảnh',
  path: '/upscale',
  desc: '',
  example_url: [
    {
      method: 'GET',
      query: '/upscale?url=',
      desc: '',
    }
  ],
};

exports.methods = {
  get: async (req, res, next) => {
    fs.readdir(_c, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (Date.now() -  file.split(".")[0].substring(0, 13) > 1000 * 60 * 1) {
          fs.unlinkSync(_c+'/' + file);
        }
      }
    });

    const imageUrl = req.url.split('e?url=')[1];

    if (!imageUrl) {
      res.send("Missing image URL");
      return;
    }

    try {
      const filename = await upscaleImage(imageUrl);
      if (!filename) {
        res.send("Error");
        return;
      }
      res.sendFile(filename);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
};

function upscaleImage(imageUrl) {
  return new Promise(async (resolve, reject) => {
    const imageBuffer = await downloadImage(imageUrl);
    if (!imageBuffer) {
      reject(new Error("Failed to download image"));
      return;
    }

    const filename = process.cwd()+'/cache/' + Date.now() + Math.random() + ".png";
    fs.writeFileSync(filename, imageBuffer);

    try {
      const upscaledData = await upscale(fs.readFileSync(filename), filename);
      fs.writeFileSync(filename, upscaledData);
      resolve(filename);
    } catch (error) {
      reject(error);
    }
  });
}

async function downloadImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
}

async function upscale(imageData, filename) {
  console.log("Upscaling...");
  const form = new FormData();
  form.append("model_version", "1");
  form.append("image", imageData, {
    contentType: "image/png",
    filename: filename,
  });
  const response = await sendRequest('post', 'https://inferenceengine.vyro.ai/upscale', form);
  return response.data;
}

async function sendRequest(method, url, data) {
  const formHeaders = data.getHeaders();
  const headers = {
    'Accept': 'application/json',
    'Accept-Charset': 'UTF-8',
    'User-Agent': 'Ktor client',
    'Host': 'inferenceengine.vyro.ai',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
  };

  try {
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
  } catch (error) {
    console.error("Error sending request:", error);
    throw error;
  }
              }
