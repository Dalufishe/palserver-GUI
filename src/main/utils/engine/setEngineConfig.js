import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { ENGINE_PATH } from '../../constant';
import path from 'path';

export default function setEngineConfig(config) {
  const engineConfigPath = path.join(ENGINE_PATH, 'engine.config.json');

  fs.writeFileSync(engineConfigPath, JSON.stringify(config), {
    encoding: 'utf-8',
  });
}
