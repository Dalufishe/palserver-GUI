/* eslint-disable no-use-before-define */
import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import {
  ENGINE_PATH,
  SERVER_TEMPLATE_PATH,
  STEAMCMD_PATH,
} from '../../../constant';
import isASCII from '../../../../utils/isASCII';
import loadSavedTemplate from '../../../services/templates/loadSaveTemplate';
import loadUE4SSTemplate from '../../../services/templates/loadUE4SSTemplate';
import loadPalguardTemplate from '../../../services/templates/loadPalguardTemplate';

ipcMain.on(Channels.runServerInstall, async (event) => {



  if (!isASCII(ENGINE_PATH)) {
    event.reply(Channels.runServerInstallReply.ERROR, {
      errorMessage: 'ASCII',
    });
  } else {
    const steamcmd = path.join(STEAMCMD_PATH, 'steamcmd.exe');

    const palserverUpdate = spawn(steamcmd, [
      '+login',
      'anonymous',
      '+app_update',
      // palworld dedicated server id
      '2394010',
      'validate',
      '+quit',
    ]);

    palserverUpdate.stdout.on('data', (data) => {
      event.reply(Channels.runServerInstallReply.PROGRESS, {
        message: data.toString().slice(0, 100) + '...',
      });
    });

    palserverUpdate.on('exit', async () => {
      await Promise.all([
        loadSavedTemplate(path.join(SERVER_TEMPLATE_PATH, 'Pal/Saved')),
        loadUE4SSTemplate(
          path.join(SERVER_TEMPLATE_PATH, 'Pal/Binaries/Win64'),
        ),
        loadPalguardTemplate(
          path.join(SERVER_TEMPLATE_PATH, 'Pal/Binaries/Win64'),
        ),
      ]);
      event.reply(Channels.runServerInstallReply.DONE);
    });
  }
});
