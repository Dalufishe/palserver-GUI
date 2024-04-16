import { ipcMain } from 'electron';
import Channels from '../../channels';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import fs from 'fs/promises';
import path from 'path';
import readWorldSettingsini from '../../../services/readWorldSettingsini';
import writeWorldSettingsini from '../../../services/writeWorldSettingsini';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';

ipcMain.handle(
  Channels.editServerInstance,
  async (
    event,
    serverId: string,
    serverConfig: {
      ServerName?: string;
      PublicIP?: string;
      PublicPort?: string;
      ServerPassword?: string;
      AdminPassword?: string;
    },
  ) => {
    const editedTime = Date.now();

    // 實體路徑
    const editedInstancePath = path.join(USER_SERVER_INSTANCES_PATH, serverId);

    // 伺服器路徑
    const editServerPath = path.join(editedInstancePath, 'server');

    /**
     ** === 修改設定檔 ===
     */

    // 修改實體設置檔 (.pal)

    const serverInstanceSettingPath = path.join(editedInstancePath, '.pal');

    const prevServerInstanceSettingJson: ServerInstanceSetting = JSON.parse(
      await fs.readFile(serverInstanceSettingPath, { encoding: 'utf-8' }),
    );

    const serverInstanceSettingJson: ServerInstanceSetting = {
      ...prevServerInstanceSettingJson,
      editedAt: editedTime,
    };

    fs.writeFile(
      serverInstanceSettingPath,
      JSON.stringify(serverInstanceSettingJson),
      { encoding: 'utf-8' },
    );

    // 修改世界設定 (ini)
    const worldSettingsiniPath = path.join(
      editServerPath,
      'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
    );

    const prevWorldSettingsiniJson =
      await readWorldSettingsini(worldSettingsiniPath);

    const worldSettingsiniJson = {
      ...prevWorldSettingsiniJson,
      ...serverConfig,
    };

    writeWorldSettingsini(worldSettingsiniPath, worldSettingsiniJson);

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
