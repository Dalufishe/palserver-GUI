const { contextBridge, ipcRenderer, shell } = require("electron");
const os = require("os");
const path = require("path");
const fs = require("fs");
const { openExplorer } = require("explorer-opener")

contextBridge.exposeInMainWorld("electron", {
    path: () => path,
    __dirname: () => __dirname,
    homeDir: () => os.homedir(),
    arch: () => os.arch(),
    osVersion: () => os.version(),
    openExplorer: (p) => openExplorer(path.join(__dirname, p)),
    openLink: (link) => shell.openExternal(link)
});

contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, ...data) => ipcRenderer.send(channel, ...data),
    on: (channel, func) =>
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
    off: (channel, listener) => ipcRenderer.off(channel, listener),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

contextBridge.exposeInMainWorld("engine", {
    currentSave: () => {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "./engine/steamapps/common/PalServer/Pal/Saved/.pal"), { encoding: "utf-8" })).saveId
    }
})