const Channels = {
  // init
  getIsFirstInstall: 'get-is-first-install',
  runServerInstall: 'run-server-install',
  runServerInstallReply: {
    PROGRESS: 'run-server-install:progress',
    ERROR: 'run-server-install:error',
    DONE: 'run-server-install:done',
  },
  listenWorldsettingsToSav: 'listen-world-settings-to-sav',
  // 伺服器操作
  execStartServer: 'exec-start-server',
  execStartServerReply: {
    DONE: 'exec-start-server:done',
    DATA: 'exec-start-server:data',
    EXIT: 'exec-start-server:exit',
    ERROR: 'exec-start-server:error',
  },
  execShutdownServer: 'exec-shutdown-server',
  // 伺服器實體
  createServerInstance: 'create-server-instance',
  editServerInstance: 'edit-server-instance',
  deleteServerInstance: 'delete-server-instance',
  duplicateServerInstance: 'duplicate-server-instance',
  updateServerInstance: 'update-server-instance',
  updateServerInstanceReply: {
    DONE: 'update-server-instance:done',
  },
  changeInstancePath: 'change-instance-path',
  // 伺服器圖示圖像檔
  getAllServerIcons: 'get-all-server-icons',
  getServerIcon: 'get-server-icon',
  // 伺服器實體設定檔
  getAllServerInfo: 'get-all-server-info',
  getServerInfo: 'get-server-info',
  setServerInfo: 'set-server-info',
  // 伺服器世界設定檔
  getWorldSettings: 'get-world-settings',
  setWorldSettings: 'set-world-settings',
  // 工具
  getFolderSize: 'get-folder-size',
  getComputerResources: 'get-computer-resources',
  getSingleProcessResources: 'get-single-process-resources',
  // 日誌
  getServerLog: 'get-server-log',
  getServerLogReply: {
    DATA: 'get-server-log:data',
  },
  // REST
  sendRestAPI: 'send-rest-api',
  // RCON
  sendRCONCommand: 'send-rcon-command',
  // backup
  getOfficalServerBackup: 'get-offical-server-backup',
  // saved
  getCorrectSaveGamesPath: 'get-correct-savegames-path',
  // update
  updatePalguard: 'update-palguard',
  updateUE4SS: 'update-ue4ss',
  // cache
  clearSystemCache: 'clear-system-cache',
  // mods
  getLuaMods: 'get-lua-mods',
  getPakMods: 'get-pak-mods',
  getPakLogicMods: 'get-pak-logic-mods',
  deleteLuaMods: 'delete-lua-mods',
  deletePakMods: 'delete-pak-mods',
  deletePakLogicMods: 'delete-pak-logic-mods',
  exportModsToClientSide: 'export-mods-to-client-side',
  // ban
  getServerBanList: 'get-server-ban-list',
  
} as const;
export default Channels;
