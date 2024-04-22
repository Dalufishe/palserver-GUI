import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs/promises';
import path from 'path';
import readWorldSettingsini from '../../../services/worldSettings/readWorldSettingsini';
import writeWorldSettingsini from '../../../services/worldSettings/writeWorldSettingsini';
import uniqid from 'uniqid';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import convertToWorldOptionsByServerId from '../../../services/worldSettings/convertToWorldOptionsByServerId';
import getWorldSettingsByServerId from '../../../services/worldSettings/getWorldSettingsByServerId';
import setWorldSettingsiniByServerId from '../../../services/worldSettings/setWorldSettingsiniByServerId';

ipcMain.handle(
  Channels.duplicateServerInstance,
  async (event, fromServerId: string, newServerName: string) => {
    const newServerId = uniqid('sr-');
    const createdTime = Date.now();

    // 實體路徑

    const oldInstancePath = path.join(USER_SERVER_INSTANCES_PATH, fromServerId);

    const newInstancePath = path.join(USER_SERVER_INSTANCES_PATH, newServerId);

    /**
     ** === 複製伺服器 ===
     */

    // 讀取舊伺服器，建立新伺服器
    await fs.cp(oldInstancePath, newInstancePath, {
      recursive: true,
      force: true,
    });

    /**
     ** === 寫入設定檔 ===
     */

    // 寫入實體設置檔 (.pal)

    const prevdServerInstanceSettingPath = path.join(oldInstancePath, '.pal');

    const prevServerInstanceSettingJson = JSON.parse(
      await fs.readFile(prevdServerInstanceSettingPath, { encoding: 'utf-8' }),
    );

    const serverInstanceSettingPath = path.join(newInstancePath, '.pal');
    const serverInstanceSettingJson: ServerInstanceSetting = {
      ...prevServerInstanceSettingJson,
      serverId: newServerId,
      instancePath: newInstancePath,
      serverPath: path.join(newInstancePath, 'server'),
      createdAt: createdTime,
    };
    fs.writeFile(
      serverInstanceSettingPath,
      JSON.stringify(serverInstanceSettingJson),
      { encoding: 'utf-8' },
    );

    // 寫入世界設定 (ini)
    const prevWorldSettingsiniJson =
      await getWorldSettingsByServerId(newServerId);

    const worldSettingsiniJson = {
      ...prevWorldSettingsiniJson,
      ...{ ServerName: newServerName },
    };

    setWorldSettingsiniByServerId(newServerId, worldSettingsiniJson);

    // 寫入世界設定 (sav)

    // 讀取可能是複數的 0 底下的 saves
    // const saves = await fs.readdir(path.join(SavePath, 'SaveGames/0'));

    // saves?.map((save) => {
    //   iniToWorldOptions(
    //     SaveSettingsPath,
    //     path.join(SavePath, `SaveGames/0/${save}`),
    //   );
    // });

    return newServerId;
  },
);
