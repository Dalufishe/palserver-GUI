import path from 'path';
import { TEMPLATE_PATH } from '../../constant';
import fs from 'fs/promises';

export default async function loadUE4SSTemplate(to: string) {
  const from = path.join(TEMPLATE_PATH, 'UE4SS');
  fs.cp(from, to, { force: true, recursive: true });
}
