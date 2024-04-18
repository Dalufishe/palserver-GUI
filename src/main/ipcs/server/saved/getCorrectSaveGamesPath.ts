import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import path from 'path';
import fs from 'fs/promises';
import fsc from 'fs';
import getSortedFiles from '../../../utils/getSortedFiles';

ipcMain.handle(Channels.getCorrectSaveGamesPath, async (event, serverId) => {
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');
  const saveGamesZeroPath = path.join(serverPath, 'Pal/Saved/SaveGames/0');

  if (fsc.existsSync(saveGamesZeroPath)) {
    const saveGamesZeroDir = await getSortedFiles(saveGamesZeroPath);

    if (!saveGamesZeroDir.length) return '';

    const saveGamesPath = path.join(saveGamesZeroPath, saveGamesZeroDir[0]);
    return saveGamesPath;
  }
  return '';
});
