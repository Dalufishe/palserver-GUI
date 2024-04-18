import { ipcMain, ipcRenderer } from 'electron';
import Channels from '../../channels';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import axios from 'axios';
import getWorldSettingsByServerId from '../../utils/getWorldSettingsByServerId';

ipcMain.handle(
  Channels.sendRestAPI,
  async (
    event,
    serverId: string,
    api: string,
    options?: { body: any; method: string },
  ) => {
    const worldSettings = await getWorldSettingsByServerId(serverId);

    const { RESTAPIPort } = worldSettings;
    const username = 'admin';
    const password = trimWorldSettingsString(worldSettings.AdminPassword);

    const result = await axios(`http://127.0.0.1:${RESTAPIPort}/v1/api${api}`, {
      method: options?.method || 'get',
      auth: {
        username,
        password,
      },
      data: options?.body,
    });

    return result.data;
  },
);
