import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import writeWorldOptionsini from '../../../services/writeWorldSettingsini';

ipcMain.handle(
  Channels.setWorldSettings,
  async (event, serverId: string, newWorldSettings: any) => {
    const worldSettingsPath = path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
      'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
    );
    writeWorldOptionsini(worldSettingsPath, newWorldSettings);
  },
);
