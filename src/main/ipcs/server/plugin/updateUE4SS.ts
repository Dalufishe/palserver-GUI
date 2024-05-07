import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import path from 'path';
import loadUE4SSTemplate from '../../../services/templates/loadUE4SSTemplate';

ipcMain.on(Channels.updateUE4SS, async (event, serverId: string) => {
  loadUE4SSTemplate(
    path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
      'Pal/Binaries/Win64',
    ),
  );
});
