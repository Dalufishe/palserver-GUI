import { ipcMain, ipcRenderer } from 'electron';
import Channels from '../../channels';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import axios from 'axios';
import getWorldSettingsByServerId from '../../utils/getWorldSettingsByServerId';

ipcMain.handle(
  Channels.getRestAPI,
  async (event, api: string, serverId: string) => {
    const worldSettings = await getWorldSettingsByServerId(serverId);

    const { RESTAPIPort } = worldSettings;
    const username = 'admin';
    const password = trimWorldSettingsString(worldSettings.AdminPassword);

    const result = await axios.get(
      `http://127.0.0.1:${RESTAPIPort}/v1/api${api}`,
      {
        auth: {
          username,
          password,
        },
      },
    );

    return result.data;
  },
);
