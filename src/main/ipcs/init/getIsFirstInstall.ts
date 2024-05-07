import { ipcMain } from 'electron';
import Channels from '../channels';

ipcMain.handle(Channels.getIsFirstInstall, () => {
  const cmd = process.argv[1];

  if (cmd === '--squirrel-firstrun') {
    // Running for the first time.
    return true;
  }
  return false;
});
