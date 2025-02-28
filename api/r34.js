exports.info = {
  title: 'rule34',
  path: '/r34',
  desc: '',
  example_url: [
    {
      method: 'GET',
      query: '/r34?name=anime',
      desc: '',
    }
  ],
};

exports.methods = {
  get: async (req, res, next) => {
    try {
      const axios = require("axios");
      const cheerio = require("cheerio");
      const t = req.query.name;

      if (t) {
        const exemptJson = await axios.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&pid=0&tags=${encodeURIComponent(t)}`);
        const $ = cheerio.load(exemptJson.data);
        const posts = $("posts").find("post");
        const result = {
          count: posts.length,
          data: []
        };

        for (let i = 0; i < posts.length; i++) {
          const data = $(posts[i]).attr("file_url");
          result.data.push(data);
        }

        res.json(result);
      } else {
        res.json({
          msg: "Invalid link"
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: "An error occurred"
      });
    }
  },
};
