// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron';
import path from 'path';
import openExplorer from 'explorer-opener';
import fs from 'fs';
import Channels from './ipcs/channels';
import {
  APP_DATA_PATH,
  ENGINE_PATH,
  SERVER_ICONS_PATH,
  TEMPLATE_PATH,
  USER_SERVER_INSTANCES_PATH,
} from './constant';

export type ChannelsType = (typeof Channels)[keyof typeof Channels];

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: any, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: any, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: any, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: any, ...args: any[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },

  node: {
    __dirname: () => __dirname,
    path() {
      return path;
    },
  },
  constant: {
    APP_DATA_PATH() {
      return APP_DATA_PATH;
    },
    USER_SERVER_INSTANCES_PATH() {
      return USER_SERVER_INSTANCES_PATH;
    },
    ENGNIE_PATH() {
      return ENGINE_PATH;
    },
    SERVER_ICONS_PATH() {
      return SERVER_ICONS_PATH;
    },
    SYSTEM_PALGUARD_VERSION() {
      const version = fs.readFileSync(
        path.join(TEMPLATE_PATH, 'Palguard', 'palguard.version.txt'),
        { encoding: 'utf-8' },
      );
      return version;
    },
    SERVER_PALGUARD_VERSION(serverId: string) {
      try {
        const version = fs.readFileSync(
          path.join(
            USER_SERVER_INSTANCES_PATH,
            serverId,
            'server',
            'Pal/Binaries/Win64',
            'palguard.version.txt',
          ),
          { encoding: 'utf-8' },
        );
        return version;
      } catch (e) {
        return 0;
      }
    },
    SYSTEM_UE4SS_VERSION() {
      const version = fs.readFileSync(
        path.join(TEMPLATE_PATH, 'UE4SS', 'ue4ss.version.txt'),
        { encoding: 'utf-8' },
      );
      return Number(version);
    },
    SERVER_UE4SS_VERSION(serverId: string) {
      try {
        const version = fs.readFileSync(
          path.join(
            USER_SERVER_INSTANCES_PATH,
            serverId,
            'server',
            'Pal/Binaries/Win64',
            'ue4ss.version.txt',
          ),
          { encoding: 'utf-8' },
        );
        return Number(version);
      } catch (e) {
        return 0;
      }
    },
  },

  openExplorer: (p: string) => fs.existsSync(p) && openExplorer(p),
  openLink: (link: string) => shell.openExternal(link),
  alert: (message: string) => ipcRenderer.send('alert', message),
  selectFolder: () => ipcRenderer.invoke('selectDir'),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
export type ElectronHandler = typeof electronHandler;
