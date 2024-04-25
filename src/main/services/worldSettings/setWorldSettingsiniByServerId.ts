import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../constant';
import fsc from 'fs';
import getSortedFiles from '../../utils/getSortedFiles';
import convertToWorldOptionsSav from './convertToWorldOptionsSav';
import writeWorldSettingsini from './writeWorldSettingsini';
import convertToWorldOptionsByServerId from './convertToWorldOptionsByServerId';

export default async (serverId: string, worldSettingsiniJson: any) => {
  const serverPath = path.join(USER_SERVER_INSTANCES_PATH, serverId, 'server');

  const worldSettingsPath = path.join(
    serverPath,
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );

  await writeWorldSettingsini(worldSettingsPath, worldSettingsiniJson);
  // 退役了
  // convertToWorldOptionsByServerId(serverId);
};
