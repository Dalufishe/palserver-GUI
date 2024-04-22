const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3434;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/players', async (req, res) => {
  const { ip, port, password } = req.query;

  try {
    const result = await axios(
      'http://' + ip + ':' + port + `/v1/api/players`,
      {
        method: 'get',
        auth: {
          username: 'admin',
          password: password,
        },
      },
    );

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.get('/info', async (req, res) => {
  const { ip, port, password } = req.query;

  try {
    const result = await axios('http://' + ip + ':' + port + `/v1/api/info`, {
      method: 'get',
      auth: {
        username: 'admin',
        password: password,
      },
    });

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.listen(port, () => {
  console.log('palserver Map is running on ' + port);
});
