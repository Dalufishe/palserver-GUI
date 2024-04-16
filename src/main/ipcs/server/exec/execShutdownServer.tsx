import { ipcMain } from 'electron';
import Channels from '../../channels';

ipcMain.on(Channels.execShutdownServer, async (event, processId) => {
  process.kill(processId);
});
