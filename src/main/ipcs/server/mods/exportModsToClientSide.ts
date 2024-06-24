import { ipcMain } from 'electron';
import Channels from '../../channels';
import fsc from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import openExplorer from 'explorer-opener';

ipcMain.handle(
  Channels.exportModsToClientSide,
  async (event, serverId: string) => {
    try {
      const clientSideModPath = path.join(
        USER_SERVER_INSTANCES_PATH,
        serverId,
        './clientside-mods',
      );
      const clientSideLuaModPath = path.join(
        clientSideModPath,
        './Pal/Binaries/Win64/Mods',
      );
      const clientSidePakModPath = path.join(
        clientSideModPath,
        './Pal/Content/Paks',
      );
      const serverLuaModPath = path.join(
        USER_SERVER_INSTANCES_PATH,
        serverId,
        'server',
        'Pal/Binaries/Win64/Mods',
      );
      const serverPakModPath = path.join(
        USER_SERVER_INSTANCES_PATH,
        serverId,
        'server',
        'Pal/Content/Paks',
      );
      // 將上次生成的 lua 模組清空
      fsc.rmSync(clientSideLuaModPath, {
        recursive: true,
        force: true,
      });
      // 將上次生成的 pak 模組清空
      fsc.rmSync(clientSidePakModPath, {
        recursive: true,
        force: true,
      });

      // 生成中 ...
      await Promise.all([
        fs.cp(serverLuaModPath, clientSideLuaModPath, {
          recursive: true,
          force: true,
        }),
        fs.cp(serverPakModPath, clientSidePakModPath, {
          recursive: true,
          force: true,
        }),
      ]);

      await fs.rm(path.join(clientSidePakModPath, 'Pal-WindowsServer.pak'));

      openExplorer(clientSideModPath);

      return true;
    } catch (e) {
      return false;
    }
  },
);
