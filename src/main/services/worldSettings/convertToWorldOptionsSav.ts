import path from 'path';
import { ENGINE_PATH } from '../../constant';
import { exec } from 'child_process';

export default function convertToWorldOptionsSav(src: string, dist: string) {
  const convertProgram = path.join(
    ENGINE_PATH,
    'server-tools/palworld-worldoptions/palworld-worldoptions.exe',
  );

  exec(`${convertProgram} ${src} --output=${dist}`);
}
