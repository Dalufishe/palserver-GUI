import path from 'path';

export const APP_DATA_PATH = (function () {
  const appDataPath =
    process.env.APPDATA ||
    (process.platform === 'darwin'
      ? `${process.env.HOME}/Library/Preferences`
      : `${process.env.HOME}/.local/share`);

  return process.env.NODE_ENV === 'development'
    ? path.join(appDataPath, 'PalserverGUIDev')
    : path.join(appDataPath, 'PalserverGUI');
})();

export const USER_SERVER_INSTANCES_PATH = path.join(APP_DATA_PATH, 'instances');

export const ENGINE_PATH = path.join(__dirname, '../../engine');

export const SERVER_TEMPLATE_PATH = path.join(
  ENGINE_PATH,
  'server-template/windows',
);

export const SERVER_ICONS_PATH = path.join(ENGINE_PATH, 'server-icons');
