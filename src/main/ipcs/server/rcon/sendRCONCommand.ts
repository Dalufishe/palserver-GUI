import { ipcMain, ipcRenderer } from 'electron';
import Channels from '../../channels';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import axios from 'axios';
import getWorldSettingsByServerId from '../../utils/getWorldSettingsByServerId';
import sendCommand from '../../utils/rcon/sendCommand';

ipcMain.handle(
  Channels.sendRCONCommand,
  async (event, serverId: string, command: string) => {
    const worldSettings = await getWorldSettingsByServerId(serverId);

    const serverOptions = {
      ipAddress: '127.0.0.1',
      port: worldSettings.RCONPort,
      password: trimWorldSettingsString(worldSettings.AdminPassword),
    };
    const response = await sendCommand(serverOptions, command);
    return response;
  },
);
