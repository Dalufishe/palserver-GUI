import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { exec, spawn } from 'child_process';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import readWorldSettingsini from '../../../services/readWorldSettingsini';
import fsc from 'fs';

ipcMain.on(Channels.execStartServer, async (event, serverId) => {
  const openToCommunity = false;

  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');

  const worldSettingsPath = path.join(
    serverPath,
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );

  const palserver = `${path.join(
    serverPath,
    'Pal/Binaries/Win64/PalServer-Win64-Shipping-Cmd.exe',
  )}`;

  const worldSettings = await readWorldSettingsini(worldSettingsPath);

  const palserverStream = spawn(
    palserver,
    [
      `-RCONPort=${worldSettings.RCONPort}`,
      `-port=${worldSettings.PublicPort}`,
      `-publicport=${worldSettings.PublicPort}`,
      `-publicip=${worldSettings.PublicIP}`,
      openToCommunity ? '-publiclobby' : '',
      '-useperfthreads',
      '-NoAsyncLoadingThread',
      '-UseMultithreadForDS',
      '-logformat=text',
    ],
    { stdio: 'pipe' },
  );

  const processId = palserverStream.pid;

  // ps_tree(processId, (err, children) => {
  //   const childProcessId = children[0].PID;
  // });

  palserverStream.on('spawn', () => {
    event.reply(Channels.execStartServerReply.DONE, serverId, processId);
  });

  // palserverStream.stderr.on('data', (data) => {
  //   console.log(data);
  //   event.reply(Channels.execStartServerReply.DATA, serverId, data.toString());
  // });

  // palserverStream.stdout.on('data', (data) => {
  //   console.log(data);
  //   event.reply(Channels.execStartServerReply.DATA, serverId, data.toString());
  // });

  palserverStream.on('exit', () => {
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('close', () => {
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('disconnect', () => {
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('error', () => {
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });
});
