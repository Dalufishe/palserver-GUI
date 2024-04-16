import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import readWorldOptionsini from '../../../services/readWorldSettingsini';
import fsc from 'fs';
import getWorldSettingsByServerId from '../../utils/getWorldSettingsByServerId';

ipcMain.handle(Channels.getWorldSettings, async (event, serverId: string) => {
  const worldSettings = await getWorldSettingsByServerId(serverId);
  return worldSettings;
});
