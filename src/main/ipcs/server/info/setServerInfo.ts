import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';

ipcMain.handle(
  Channels.setServerInfo,
  async (event, serverId: string, newServerInfo: ServerInstanceSetting) => {
    const serverInstanceSettingPath = path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      '.pal',
    );

    fsc.writeFileSync(
      serverInstanceSettingPath,
      JSON.stringify(newServerInfo),
      { encoding: 'utf-8' },
    );
  },
);
