/* eslint-disable no-use-before-define */
import { ipcMain, IpcMainEvent } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { spawn } from 'child_process';
import { TEMPLATE_PATH, USER_SERVER_INSTANCES_PATH } from '../../../constant';
import readWorldSettingsini from '../../../services/worldSettings/readWorldSettingsini';
import fs from 'fs/promises';
import fsc from 'fs';
import getServerInfoByServerId from '../../../services/serverInstanceSettings/getServerInfoByServerId';
import loadUE4SSTemplate from '../../../services/templates/loadUE4SSTemplate';
import sleep from '../../../../utils/sleep';
import pidusage from 'pidusage';
import osu from 'node-os-utils';
import axios from 'axios';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import sendCommand from '../../../utils/rcon/sendCommand';

ipcMain.on(
  Channels.execStartServer,
  async (event, serverId, queryport = 27015) => {
    const serverInfo = await getServerInfoByServerId(serverId);
    const serverPath = path.join(
      USER_SERVER_INSTANCES_PATH,
      serverId,
      'server',
    );
    const binariesWin64Path = path.join(serverPath, 'Pal/Binaries/Win64');

    // #region enable ue4ss

    const ue4ssEnabled = serverInfo.ue4ssEnabled;
    const ue4ssPath = path.join(binariesWin64Path, 'UE4SS.dll');
    const ue4ssDisabledPath = path.join(
      binariesWin64Path,
      'UE4SS.disabled.dll',
    );

    // 如果 ue4ss 先前被禁用
    if (fsc.existsSync(ue4ssDisabledPath)) {
      if (ue4ssEnabled) {
        // ue4ss 啟用
        fsc.renameSync(ue4ssDisabledPath, ue4ssPath);
      }
    }
    // 如果 ue4ss 先前被啟用
    else if (fsc.existsSync(ue4ssPath)) {
      if (!ue4ssEnabled) {
        // ue4ss 禁用
        fsc.renameSync(ue4ssPath, ue4ssDisabledPath);
      }
    }
    // 如果不存在 ue4ss
    else {
      // eslint-disable-next-line no-lonely-if
      if (ue4ssEnabled) {
        loadUE4SSTemplate(path.join(serverPath, 'Pal/Binaries/Win64'));
      }
    }

    // #endregion

    // #region enable palguard

    const palguardEnabled = serverInfo.palguardEnabled;
    const palguardPath = path.join(binariesWin64Path, 'palguard.dll');
    const palguardDisabledPath = path.join(
      binariesWin64Path,
      'palguard.disabled.dll',
    );

    // 如果 palguard 先前被禁用
    if (fsc.existsSync(palguardDisabledPath)) {
      if (palguardEnabled) {
        // ue4ss 啟用
        fsc.renameSync(palguardDisabledPath, palguardPath);
      }
    }
    // 如果 palguard 先前被啟用
    else if (fsc.existsSync(palguardPath)) {
      if (!palguardEnabled) {
        // ue4ss 禁用
        fsc.renameSync(palguardPath, palguardDisabledPath);
      }
    }
    // 如果不存在 palguard
    else {
      // eslint-disable-next-line no-lonely-if
      if (palguardEnabled) {
        loadUE4SSTemplate(path.join(serverPath, 'Pal/Binaries/Win64'));
      }
    }

    // #endregion

    // #region optimized
    if (serverInfo.performanceOptimizationEnabled) {
      await fs.copyFile(
        path.join(TEMPLATE_PATH, 'Config/Engine.ini/opt/Engine.ini'),
        path.join(serverPath, 'Pal/Saved/Config/WindowsServer/Engine.ini'),
      );
    } else {
      await fs.copyFile(
        path.join(TEMPLATE_PATH, 'Config/Engine.ini/pure/Engine.ini'),
        path.join(serverPath, 'Pal/Saved/Config/WindowsServer/Engine.ini'),
      );
    }
    // #endregion

    // start server

    const processId = await startServer(
      event,
      serverId,
      queryport,
      serverInfo.UseIndependentProcess,
    );

    autoRestart(
      event,
      serverId,
      queryport,
      serverInfo.UseIndependentProcess,
      processId,
    );

    crashRestart(
      event,
      serverId,
      queryport,
      serverInfo.UseIndependentProcess,
      processId,
    );
    // #endregion

    // #region over ram restart

    // if (serverInfo.OverRamRestart) {
    //   const clearOverRamRestart = setInterval(async () => {
    //     try {
    //       if (!serverInfo.OverRamRestart) {
    //         clearInterval(clearOverRamRestart);
    //       }
    //       if (processId) {
    //         const stats = await pidusage(processId);
    //         const memInfo = await osu.mem.used();

    //         // console.log(stats);

    //         const memUsage =
    //           (stats.memory / 1024 / 1024 / memInfo.totalMemMb) * 100;

    //         if (memUsage > 90) {
    //           process.kill(processId);
    //         }
    //       }
    //       // 伺服器重新啟動
    //       await sleep(2000);
    //       processId = await startServer(event, serverId);
    //     } catch (e) {
    //       // 伺服器被提早關閉
    //       // Error: kill ESRCH
    //     }
    //   }, 1000 * 60);
    // }

    // #endregion
  },
);

const startServer = async (
  event: IpcMainEvent,
  serverId: string,
  queryport: number,
  useIndependentProcess: boolean,
) => {
  const serverInfo = await getServerInfoByServerId(serverId);
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');

  const worldSettingsPath = path.join(
    serverPath,
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );

  const worldSettings = await readWorldSettingsini(worldSettingsPath);

  const palserver = `${path.join(
    serverPath,
    useIndependentProcess
      ? 'PalServer.exe'
      : 'Pal/Binaries/Win64/PalServer-Win64-Shipping.exe',
  )}`;

  const palserverStream = spawn(palserver, [
    `-RCONPort=${worldSettings.RCONPort}`,
    `-port=${worldSettings.PublicPort}`,
    `-publicport=${worldSettings.PublicPort}`,
    `-publicip=${worldSettings.PublicIP}`,
    `-QueryPort=${queryport}`,
    serverInfo.openToCommunity ? '-publiclobby' : '',
    serverInfo.performanceOptimizationEnabled ? '-useperfthreads' : '',
    serverInfo.performanceOptimizationEnabled ? '-NoAsyncLoadingThread' : '',
    serverInfo.performanceOptimizationEnabled ? '-UseMultithreadForDS' : '',
  ]);

  const processId = palserverStream.pid;

  // ps_tree(processId, (err, children) => {
  //   const childProcessId = children[0].PID;
  // });

  palserverStream.on('spawn', () => {
    event.reply(
      Channels.execStartServerReply.DONE,
      serverId,
      processId,
      queryport,
    );
  });

  palserverStream.on('exit', () => {
    console.log('exit');
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('close', () => {
    console.log('close');
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('disconnect', () => {
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  palserverStream.on('error', () => {
    console.log('error');
    event.reply(Channels.execStartServerReply.EXIT, serverId, processId);
  });

  return processId;
};

const autoRestart = async (
  event: IpcMainEvent,
  serverId: string,
  queryport: number,
  useIndependentProcess: boolean,
  processId: number,
) => {
  let serverInfo = await getServerInfoByServerId(serverId);
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');
  const worldSettingsPath = path.join(
    serverPath,
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );
  const worldSettings = await readWorldSettingsini(worldSettingsPath);
  const serverOptions = {
    ipAddress: '127.0.0.1',
    port: worldSettings.RCONPort,
    password: trimWorldSettingsString(worldSettings.AdminPassword),
  };
  const isEnabledRCON = worldSettings.RCONEnabled;

  if (serverInfo.AutoRestart && isEnabledRCON) {
    const clearAutoRestart = setInterval(
      async () => {
        try {
          serverInfo = await getServerInfoByServerId(serverId);
          if (!serverInfo.AutoRestart) {
            clearInterval(clearAutoRestart);
          }
          sendCommand(serverOptions, 'save');
          sendCommand(serverOptions, 'shutdown 1');
          // 伺服器重新啟動
          await sleep(5000);
          await startServer(event, serverId, queryport, useIndependentProcess);
        } catch (e) {
          //
        }
      },
      serverInfo.AutoRestart * 1000 * 60 * 60,
    );
  }
};

const crashRestart = async (
  event: IpcMainEvent,
  serverId: string,
  queryport: number,
  useIndependentProcess: boolean,
  processId: number,
) => {
  let serverInfo = await getServerInfoByServerId(serverId);
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');
  const worldSettingsPath = path.join(
    serverPath,
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );
  const worldSettings = await readWorldSettingsini(worldSettingsPath);
  const serverOptions = {
    ipAddress: '127.0.0.1',
    port: worldSettings.RCONPort,
    password: trimWorldSettingsString(worldSettings.AdminPassword),
  };
  const isEnabledRCON = worldSettings.RCONEnabled;

  if (serverInfo.CrashRestart && isEnabledRCON) {
    const clearCrashRestart = setInterval(async () => {
      try {
        serverInfo = await getServerInfoByServerId(serverId);
        if (!serverInfo.CrashRestart) {
          clearInterval(clearCrashRestart);
        }
        try {
          await sendCommand(serverOptions, 'info');
        } catch (e) {
          await startServer(event, serverId, queryport, useIndependentProcess);
        }
      } catch (e) {
        //
      }
    }, 1000 * 5);
  }
};
