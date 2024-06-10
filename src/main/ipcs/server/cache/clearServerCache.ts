import { ipcMain } from 'electron';
import { STEAMCMDAPPS_TEMPLATE_PATH } from '../../../constant';
import Channels from '../../channels';
import fs from 'fs/promises';

ipcMain.handle(Channels.clearSystemCache, async (event) => {
  fs.rm(STEAMCMDAPPS_TEMPLATE_PATH, { recursive: true, force: true });
});
