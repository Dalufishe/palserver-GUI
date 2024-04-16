import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import isJsonString from '../../../../utils/isJsonString';

ipcMain.handle(Channels.getServerInfo, async (event, serverId: string) => {
  const serverInstanceSettingPath = path.join(
    USER_SERVER_INSTANCES_PATH,
    serverId,
    '.pal',
  );

  if (fsc.existsSync(serverInstanceSettingPath)) {
    const serverInfoText = fsc.readFileSync(serverInstanceSettingPath, {
      encoding: 'utf-8',
    });
    const serverInfo: ServerInstanceSetting = isJsonString(serverInfoText)
      ? JSON.parse(serverInfoText)
      : {};
    return serverInfo;
  }

  return {};
});
