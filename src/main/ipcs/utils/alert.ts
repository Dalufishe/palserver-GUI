// electron.js ...

import { dialog, ipcMain } from 'electron';

ipcMain.on('alert', (event, message: string) => {
  dialog.showMessageBox({
    type: 'info',
    message,
  });
});
