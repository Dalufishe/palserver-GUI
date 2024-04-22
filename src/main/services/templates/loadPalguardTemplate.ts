import path from 'path';
import { TEMPLATE_PATH } from '../../constant';
import fs from 'fs/promises';

export default async function loadPalguardTemplate(to: string) {
  const from = path.join(TEMPLATE_PATH, 'Palguard');
  fs.cp(from, to, { force: true, recursive: true });
}
