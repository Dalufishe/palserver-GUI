/* eslint-disable no-use-before-define */
// import { ipcMain } from 'electron';
// import Channels from '../../channels';
// import fs from 'fs/promises';
// import fsc from 'fs';
// import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
// import path from 'path';

// ipcMain.handle(Channels.listenWorldsettingsToSav, async (event) => {
//   const serverIds = await fs.readdir(USER_SERVER_INSTANCES_PATH);

//   serverIds.forEach((serverId) => {
//     const worldSettingsPath = path.join(
//       USER_SERVER_INSTANCES_PATH,
//       serverId,
//       'server',
//       'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
//     );
//   });

//   const watcher = fsc.watch(USER_SERVER_INSTANCES_PATH, () => {});
// });
