import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs';
import getSortedFiles from '../../../utils/getSortedFiles';

ipcMain.on(Channels.getServerLog, async (event, serverId) => {
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');
  const serverLogsPath = path.join(
    serverPath,
    'Pal/Binaries/Win64/PalDefender/logs',
  );
  let serverLogsDir = await getSortedFiles(serverLogsPath);

  // let serverLogsStartWithNumber = serverLogsDir.filter((l) =>
  //   /^\d{2}\.\d{2} \d{2}\.\d{2}\.\d{2}$/.test(l),
  // ); // 更新過濾條件

  // latest log file
  let serverLogFile = path.join(serverLogsPath, serverLogsDir[0]);

  let log = fs.readFileSync(serverLogFile, { encoding: 'utf-8' });
  event.reply(Channels.getServerLogReply.DATA, log);

  fs.watchFile(serverLogFile, async () => {
    log = fs.readFileSync(serverLogFile, { encoding: 'utf-8' });
    event.reply(Channels.getServerLogReply.DATA, log);
  });

  fs.watch(serverLogsPath, async () => {
    serverLogsDir = await getSortedFiles(serverLogsPath);
    serverLogsDir = serverLogsDir.filter((l) =>
      /^\d{2}\.\d{2} \d{2}\.\d{2}\.\d{2}$/.test(l),
    ); // 更新過濾條件

    // latest log file
    serverLogFile = path.join(serverLogsPath, serverLogsDir[0]);

    log = fs.readFileSync(serverLogFile, { encoding: 'utf-8' });
    console.log(log);
    event.reply(Channels.getServerLogReply.DATA, log);
  });
});
