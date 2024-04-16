// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron';
import path from 'path';
import openExplorer from 'explorer-opener';
import fs from 'fs';
import Channels from './ipcs/channels';
import { APP_DATA_PATH, USER_SERVER_INSTANCES_PATH } from './constant';

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
  },

  openExplorer: (p: string) => fs.existsSync(p) && openExplorer(p),
  openLink: (link: string) => shell.openExternal(link),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
export type ElectronHandler = typeof electronHandler;
