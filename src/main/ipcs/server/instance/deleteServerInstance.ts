import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs/promises';
import path from 'path';

ipcMain.handle(
  Channels.deleteServerInstance,
  async (event, serverId: string) => {
    // 實體路徑
    const editedInstancePath = path.join(USER_SERVER_INSTANCES_PATH, serverId);
    try {
      await fs.rm(editedInstancePath, { recursive: true, force: true });
      return true;
    } catch (e) {
      return false;
    }
  },
);
