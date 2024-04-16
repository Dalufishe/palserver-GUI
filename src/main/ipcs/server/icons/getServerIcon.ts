import { ipcMain, nativeImage } from 'electron';
import Channels from '../../channels';
import fs from 'fs/promises';
import path from 'path';
import { SERVER_ICONS_PATH } from '../../../constant';
import { ServerIcon } from '../../../../types/ServerIcon.types';

ipcMain.handle(Channels.getServerIcon, async (event, iconId) => {
  const iconFiles = await fs.readdir(SERVER_ICONS_PATH);

  const destIconFile =
    iconFiles.find((iconFile) => {
      const fileIconId = iconFile.split('.')[0];
      return fileIconId === iconId;
    }) || '';

  const iconPath = path.join(SERVER_ICONS_PATH, destIconFile);
  const image = nativeImage.createFromPath(iconPath).toDataURL();

  return {
    id: iconId,
    image,
  } as ServerIcon;
});
