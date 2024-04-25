import axios from 'axios';
import { ENGINE_PATH } from '../../constant';
import express from 'express';
import path from 'path';
import getWorldSettingsByServerId from '../../services/worldSettings/getWorldSettingsByServerId';
import trimWorldSettingsString from '../../../utils/trimWorldSettingsString';

const app = express();
const port = 3434;

app.use(express.static(path.join(ENGINE_PATH, 'server-online-map', 'public')));

app.get('/:serverId/players', async (req, res) => {
  const serverId = req.params.serverId;

  const worldSettings = await getWorldSettingsByServerId(serverId);

  const ipAdress = '127.0.0.1';
  const apiPort = worldSettings.RESTAPIPort || 8212;
  const adminPassword = trimWorldSettingsString(worldSettings.AdminPassword);

  try {
    const result = await axios(`http://${ipAdress}:${apiPort}/v1/api/players`, {
      method: 'get',
      auth: {
        username: 'admin',
        password: adminPassword,
      },
    });

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.get('/:serverId/info', async (req, res) => {
  const serverId = req.params.serverId;

  const worldSettings = await getWorldSettingsByServerId(serverId);

  const ipAdress = '127.0.0.1';
  const apiPort = worldSettings.RESTAPIPort || 8212;
  const adminPassword = trimWorldSettingsString(worldSettings.AdminPassword);

  try {
    const result = await axios(`http://${ipAdress}:${apiPort}/v1/api/info`, {
      method: 'get',
      auth: {
        username: 'admin',
        password: adminPassword,
      },
    });

    res.send(result.data || {});
  } catch (e) {
    res.send({});
  }
});

app.listen(port, () => {
  // console.log('palserver Map is running on ' + port);
});
