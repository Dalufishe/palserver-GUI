import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs/promises';
import path from 'path';
import setEngineConfig from '../../../utils/engine/setEngineConfig';

ipcMain.handle(
  Channels.changeInstancePath,
  async (event, prevPath: string, newPath: string) => {
    setEngineConfig({ USER_SERVER_INSTANCES_PATH: newPath });
  },
);
