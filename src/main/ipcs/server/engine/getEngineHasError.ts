import { ipcMain } from 'electron';
import { SERVER_TEMPLATE_PATH } from '../../../constant';
import Channels from '../../channels';
import fs from 'fs/promises';

ipcMain.handle(Channels.getEngineHasError, async () => {
  try {
    // 檢查資料夾是否存在
    await fs.access(SERVER_TEMPLATE_PATH);

    // 讀取資料夾內容
    const files = await fs.readdir(SERVER_TEMPLATE_PATH);

    // 如果資料夾為空，則返回 true，否則返回 false
    return files.length === 0;
  } catch (error) {
    // 如果資料夾不存在或發生錯誤，返回 false
    return false;
  }
});
