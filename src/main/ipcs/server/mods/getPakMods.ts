import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';

ipcMain.handle(Channels.getPakMods, async (event, serverId: string) => {
  const pakModsPath = path.join(
    USER_SERVER_INSTANCES_PATH,
    serverId,
    'server',
    'Pal/Content/Paks',
  );

  if (fsc.existsSync(pakModsPath)) {
    //
    const pakModsNames = fsc
      .readdirSync(pakModsPath)
      .filter(
        (mod) =>
          ![
            'LogicMods',
            'Pal-WindowsServer.pak',
            'Pal-WindowsServer.ucas',
            'Pal-WindowsServer.utoc',
            'global.ucas',
            'global.utoc',
          ].includes(mod),
      );

    return pakModsNames.map((name) => ({
      name,
      isDirectory: fsc.statSync(path.join(pakModsPath, name)).isDirectory(),
    }));
  }

  return [];
});
