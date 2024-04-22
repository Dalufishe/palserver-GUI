import path from 'path';

export const APP_DATA_PATH = (function () {
  const appDataPath = process.env.APPDATA || '';
  return process.env.NODE_ENV === 'development'
    ? path.join(appDataPath, '../Local/Programs', 'palserver-gui-dev')
    : path.join(appDataPath, '../Local/Programs', 'palserver-gui');
})();

export const USER_SERVER_INSTANCES_PATH = path.join(APP_DATA_PATH, 'instances');

export const ENGINE_PATH =
  process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '../../assets/engine')
    : path.join(APP_DATA_PATH, 'resources/assets/engine');

export const STEAMCMD_PATH = path.join(ENGINE_PATH, 'steamcmd-engine');

export const STEAMCMDAPPS_TEMPLATE_PATH = path.join(STEAMCMD_PATH, 'steamapps');

export const SERVER_TEMPLATE_PATH = path.join(
  STEAMCMDAPPS_TEMPLATE_PATH,
  'common/PalServer',
);

export const TEMPLATE_PATH = path.join(ENGINE_PATH, 'server-template');

export const SERVER_ICONS_PATH = path.join(ENGINE_PATH, 'server-icons');
