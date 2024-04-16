import { ipcMain } from 'electron';
import Channels from '../channels';
import fastFolderSize from 'fast-folder-size';
import { promisify } from 'util';

ipcMain.handle(Channels.getFolderSize, async (event, path) => {
  const folderSize = await promisify(fastFolderSize)(path);
  return folderSize;
});
