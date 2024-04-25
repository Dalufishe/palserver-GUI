import { ipcMain } from 'electron';
import Channels from '../../channels';
import {
  SERVER_TEMPLATE_PATH,
  USER_SERVER_INSTANCES_PATH,
} from '../../../constant';
import fs from 'fs/promises';
import path from 'path';
import uniqid from 'uniqid';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import setWorldSettingsiniByServerId from '../../../services/worldSettings/setWorldSettingsiniByServerId';
import getWorldSettingsByServerId from '../../../services/worldSettings/getWorldSettingsByServerId';

ipcMain.handle(
  Channels.createServerInstance,
  async (
    event,
    serverConfig: {
      ServerName: string;
      PublicIP: string;
      PublicPort: string;
      ServerPassword: string;
      AdminPassword: string;
    },
  ) => {
    const serverId = uniqid('sr-');
    const createdTime = Date.now();

    // 實體路徑
    const createdInstancePath = path.join(USER_SERVER_INSTANCES_PATH, serverId);

    // 伺服器路徑
    const createdServerPath = path.join(createdInstancePath, 'server');

    /**
     ** === 建立伺服器 ===
     */

    // 讀取模板，建立伺服器
    await fs.cp(SERVER_TEMPLATE_PATH, createdServerPath, {
      recursive: true,
      force: true,
    });

    /**
     ** === 寫入設定檔 ===
     */

    // 寫入實體設置檔 (.pal)

    const serverInstanceSettingPath = path.join(createdInstancePath, '.pal');
    const serverInstanceSettingJson: ServerInstanceSetting = {
      serverId,
      instancePath: createdInstancePath,
      serverPath: createdServerPath,
      iconId: 'SheepBall',
      createdAt: createdTime,
      performanceOptimizationEnabled: false,
      performanceMonitorEnabled: false,
      performanceMonitorAnimationEnabled: true,
      ue4ssEnabled: true,
      palguardEnabled: true,
      modManagementEnabled: false,
      AutoRestart: 0,
      CrashRestart: false,
      OverRamRestart: false,
      openToCommunity: false,
      OnlineMapEnabled: false,
      LogEnabled: true,
    };
    fs.writeFile(
      serverInstanceSettingPath,
      JSON.stringify(serverInstanceSettingJson, null, 4),
      { encoding: 'utf-8' },
    );

    // 寫入世界設定 (ini)
    const prevWorldSettingsiniJson = await getWorldSettingsByServerId(serverId);

    const worldSettingsiniJson = {
      ...prevWorldSettingsiniJson,
      ...serverConfig,
    };

    setWorldSettingsiniByServerId(serverId, worldSettingsiniJson);

    // 寫入世界設定 (sav)

    // 讀取可能是複數的 0 底下的 saves
    // const saves = await fs.readdir(path.join(SavePath, 'SaveGames/0'));

    // saves?.map((save) => {
    //   iniToWorldOptions(
    //     SaveSettingsPath,
    //     path.join(SavePath, `SaveGames/0/${save}`),
    //   );
    // });

    return serverId;
  },
);
