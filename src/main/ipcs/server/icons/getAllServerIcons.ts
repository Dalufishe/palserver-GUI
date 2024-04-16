import { ipcMain, nativeImage } from 'electron';
import Channels from '../../channels';
import fs from 'fs/promises';
import path from 'path';
import { SERVER_ICONS_PATH } from '../../../constant';
import { ServerIcon } from '../../../../types/ServerIcon.types';

ipcMain.handle(Channels.getAllServerIcons, async () => {
  const iconFiles = await fs.readdir(SERVER_ICONS_PATH);

  const iconImages = iconFiles.map((iconFile) => {
    const iconPath = path.join(SERVER_ICONS_PATH, iconFile);
    const image = nativeImage.createFromPath(iconPath).toDataURL();
    return {
      id: iconFile.split('.')[0],
      image,
    } as ServerIcon;
  });

  return iconImages;
});
