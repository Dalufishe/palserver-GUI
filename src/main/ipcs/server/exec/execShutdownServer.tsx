import { ipcMain } from 'electron';
import Channels from '../../channels';
import getServerInfoByServerId from '../../../services/serverInstanceSettings/getServerInfoByServerId';
import getWorldSettingsByServerId from '../../../services/worldSettings/getWorldSettingsByServerId';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import sendCommand from '../../../utils/rcon/sendCommand';

ipcMain.on(Channels.execShutdownServer, async (event, serverId, processId) => {
  const worldSettings = await getWorldSettingsByServerId(serverId);
  const serverOptions = {
    ipAddress: '127.0.0.1',
    port: worldSettings.RCONPort,
    password: trimWorldSettingsString(worldSettings.AdminPassword),
  };
  const isEnabledRCON = worldSettings.RCONEnabled;

  try {
    // 存檔
    await sendCommand(serverOptions, 'save');
    if (isEnabledRCON) {
      // 執行 rcon 關閉伺服器
      await sendCommand(serverOptions, 'shutdown 1');
    } else {
      //
      process.kill(processId);
    }
  } catch (e) {
    process.kill(processId);
  }
});
