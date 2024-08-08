import { ipcMain } from 'electron';
import Channels from '../../channels';
import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../../constant';
import readWorldOptionsini from '../../../services/worldSettings/readWorldSettingsini';
import fsc from 'fs';
import getWorldSettingsByServerId from '../../../services/worldSettings/getWorldSettingsByServerId';

ipcMain.handle(Channels.getServerBanList, async (event, serverId: string) => {
  const banListPath = path.join(
    USER_SERVER_INSTANCES_PATH,
    serverId,
    'server',
    'Pal/Saved/SaveGames/banlist.txt',
  );

  const banListTxt = fsc.readFileSync(banListPath, { encoding: 'utf-8' });
  const banList = banListTxt.split('\n').slice(0, -1);

  return banList;
});
