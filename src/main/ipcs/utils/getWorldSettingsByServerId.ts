import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../constant';
import fsc from 'fs';
import readWorldSettingsini from '../../services/readWorldSettingsini';

export default async (serverId: string) => {
  const worldSettingsPath = path.join(
    USER_SERVER_INSTANCES_PATH,
    serverId,
    'server',
    'Pal/Saved/Config/WindowsServer/PalWorldSettings.ini',
  );

  if (fsc.existsSync(worldSettingsPath)) {
    const worldSetting = await readWorldSettingsini(worldSettingsPath);
    return worldSetting;
  }
  return {};
};
