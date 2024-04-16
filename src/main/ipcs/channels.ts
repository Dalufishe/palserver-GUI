const Channels = {
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
  getRestAPI: 'get-rest-api',
} as const;
export default Channels;
