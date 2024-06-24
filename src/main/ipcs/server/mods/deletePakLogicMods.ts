import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import isJsonString from '../../../../utils/isJsonString';

ipcMain.handle(
  Channels.deletePakLogicMods,
  async (event, serverId: string, modName: string) => {
    const pakModsPath = path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
      'Pal/Content/Paks/LogicMods',
      modName,
    );

    if (fsc.existsSync(pakModsPath)) {
      fsc.rmSync(pakModsPath, { recursive: true, force: true });
    }
  },
);
