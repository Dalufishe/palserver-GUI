import path from 'path';
import { USER_SERVER_INSTANCES_PATH } from '../../constant';
import fsc from 'fs';
import fs from 'fs/promises';
import { ServerInstanceSetting } from '../../../types/ServerInstanceSetting.types';

export default async (serverId: string) => {
  // @ts-ignore
  let result: ServerInstanceSetting = {};

  const serverInstanceSettingPath = path.join(
    USER_SERVER_INSTANCES_PATH,
    serverId,
    '.pal',
  );

  if (fsc.existsSync(serverInstanceSettingPath)) {
    const serverInfo = await fs.readFile(serverInstanceSettingPath, {
      encoding: 'utf-8',
    });
    result = JSON.parse(serverInfo);
  }
  return result;
};
