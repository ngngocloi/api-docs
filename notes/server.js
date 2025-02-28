const express = require('express');
const ews = require('express-ws');
const cors = require('cors');
const fs = require('fs');

const app = express();
const count_req_path = `${__dirname}/count_req.json`;
let count_req_data = {};

const count_req_save = () => fs.writeFileSync(count_req_path, JSON.stringify(count_req_data), 'utf8');
const api = [];

if (!fs.existsSync(count_req_path)) count_req_save();
else count_req_data = require(count_req_path);

ews(app);
app.set('json spaces', 4);
app.use(cors());
app.use(express.json());

fs.readdirSync('./api').forEach(file => {
  try {
    let file_import = require(`./api/${file}`);
    if (!count_req_data[file_import.info.path]) count_req_data[file_import.info.path] = 0;
    if (!/^\/$/.test(file_import.info.path)) api.push(file_import.info);

    Object.keys(file_import.methods).forEach(method => {
      app[method](file_import.info.path, (req, res, next) => {
        ++count_req_data[file_import.info.path];
        file_import.methods[method](req, res, next);
        count_req_save();
      });
    });
  } catch (e) {
    console.log('Load fail: ' + file);
    console.log(e);
  }
});

app.ws('/', (ws, req) => {
  ws.on('message', async msgs => {
    let msg = JSON.parse(msgs);

    if (msg.type === 'get_info_api_HTML') {
      let _1 = JSON.stringify(count_req_data);

      const send = () => {
        const to_html = (t, d, n, p, x) => `<div class="item">
          <div class="title">${t} (<n>${n}</n>)</div>
          <p class="desc">${d}</p>
          <hr>
          ${x.map($ => ((m, q, d, q_split = q.split(/(\?)/)) => `<div class="example-url">
            <mt>${m}</mt><a class="u" href="${p}${q}"><span>${p}</span>${!q_split[0] ? `<span class="query">${q}</span>` : `<span class="param_url">${q_split.shift()}</span><span class="query">${q_split.join('')}</span>`}</a> ${d ? `<span class="desc-url">(${d})</span>` : ''}
          </div>`)($.method, $.query, $.desc)).join('')}
        </div>`;

        const msg = JSON.stringify(api.map($ => ({
          count: count_req_data[$.path], ...$
        })).sort((a, b) => a.count > b.count ? -1 : 0).map($ => to_html($.title, $.desc, count_req_data[$.path], $.path.replace(/\/:[^]+$/, ''), $.example_url || [])));

        ws.send(msg);
      };

      send();

      while (true) {
        await new Promise(resolve => setTimeout(resolve, 100));
        let _2 = JSON.stringify(count_req_data);
        if (_2 !== _1) {
          _1 = _2;
          send();
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
