import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import path from 'path';
import loadPalguardTemplate from '../../../services/templates/loadPalguardTemplate';

ipcMain.on(Channels.updatePalguard, async (event, serverId: string) => {
  loadPalguardTemplate(
    path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
      'Pal/Binaries/Win64',
    ),
  );
});
