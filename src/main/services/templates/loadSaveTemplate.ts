import path from 'path';
import { TEMPLATE_PATH } from '../../constant';
import fs from 'fs/promises';

export default async function loadSavedTemplate(to: string) {
  const from = path.join(TEMPLATE_PATH, 'Saved');
  fs.cp(from, to, { force: true, recursive: true });
}
