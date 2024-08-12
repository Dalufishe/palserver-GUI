import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { ENGINE_PATH } from '../../constant';
import path from 'path';

export default function getEngineConfig() {
  const config = fs.readFileSync(path.join(ENGINE_PATH, 'engine.config.json'), {
    encoding: 'utf-8',
  });

  return JSON.parse(config);
}
