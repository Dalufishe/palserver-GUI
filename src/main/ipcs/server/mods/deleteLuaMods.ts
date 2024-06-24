import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import isJsonString from '../../../../utils/isJsonString';

ipcMain.handle(
  Channels.deleteLuaMods,
  async (event, serverId: string, modName: string) => {
    const luaModPath = path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
      'Pal/Binaries/Win64/Mods',
      modName,
    );

    if (fsc.existsSync(luaModPath)) {
      fsc.rmSync(luaModPath, { recursive: true, force: true });
    }
  },
);
