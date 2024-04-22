import { ipcMain } from 'electron';
import Channels from '../../channels';
import { STEAMCMD_PATH, USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

ipcMain.on(Channels.updateServerInstance, async (event, serverId: string) => {
  const steamcmd = path.join(STEAMCMD_PATH, 'steamcmd.exe');

  const palserverUpdate = spawn(steamcmd, [
    '+force_install_dir',
    path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server'),
    '+login',
    'anonymous',
    '+app_update',
    // palworld dedicated server id
    '2394010',
    'validate',
    '+quit',
  ]);

  palserverUpdate.on('exit', async () => {
    event.reply(Channels.updateServerInstanceReply.DONE);
  });
});
