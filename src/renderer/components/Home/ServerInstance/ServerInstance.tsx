import { AlertDialog, Spinner } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import ChangeServerIcon from './ChangeServerIcon/ChangeServerIcon';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';
import useServerIcon from '../../../hooks/server/icons/useServerIcon';
import ServerInfoProvider from './ServerInfoProvider/ServerInfoProvider';
import EditServerAlert from './EditServer/EditServerAlert';
import trimWorldSettingsString from '../../../../utils/trimWorldSettingsString';
import TheContextMenu, { ContextMenuOptions } from '../../ContextMenu';
import { USER_SERVER_INSTANCES_PATH } from '../../../../main/constant';
import Channels from '../../../../main/ipcs/channels';
import DeleteServerAlert from './DeleteServer/DeleteServerAlert';
import useWorldSettings from '../../../hooks/server/world-settings/useWorldSettings';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import DuplicateServerAlert from './DuplicateServer/DuplicateServerAlert';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';
import useCorrectSaveGamesPath from '../../../hooks/server/saved/useCorrectSaveGamesPath';

type Props = {
  info: ServerInstanceSetting;
};

export default function ServerInstance(props: Props) {
  const { t } = useTranslation();

  const serverIcon = useServerIcon(props.info.iconId);
  const { worldSettings } = useWorldSettings(props.info.serverId);
  const saveGamesPath = useCorrectSaveGamesPath(props.info.serverId);

  const [instanceSize, setIntanceSize] = useState();
  useEffect(() => {
    if (props.info.instancePath)
      window.electron.ipcRenderer
        .invoke(Channels.getFolderSize, props.info.instancePath)
        .then((size) => {
          setIntanceSize(size);
        });
  }, [props.info.instancePath]);

  const [currentAlertWindow, setCurrentAlretWindow] = useState('');
  const serverOptions: ContextMenuOptions = [
    //* 伺服器名稱
    {
      id: 'ServerName',
      type: 'disabled',
      value: `${((instanceSize || 0) / 1024 / 1024 / 1024).toFixed(2)} GB`,
      color: 'gray',
      action() {
        setCurrentAlretWindow('');
      },
    },
    //* ===
    {
      id: '',
      type: 'seperator',
    },
    //* 編輯伺服器
    {
      id: 'EditServer',
      type: 'action',
      action() {
        setCurrentAlretWindow('EditServer');
      },
    },
    //* 修改圖示
    {
      id: 'ChangeIcon',
      type: 'action',
      action() {
        setCurrentAlretWindow('ChangeIcon');
      },
    },
    //* ===
    {
      id: '',
      type: 'seperator',
    },
    //* 複製伺服器
    {
      id: 'CopyServer',
      type: 'action',
      action() {
        setCurrentAlretWindow('DuplicateServer');
      },
    },
    //* 導出伺服器
    {
      id: 'ExportServer',
      type: 'sub',
      sub: [
        {
          id: 'DedicatedServer',
          type: 'action',
        },
        {
          id: 'ServerInstance',
          type: 'action',
        },
      ],
    },
    //* ===
    {
      id: '',
      type: 'seperator',
    },
    //* 伺服器資料夾
    {
      id: 'ServerFolder',
      type: 'action',
      action() {
        setCurrentAlretWindow('');

        const serverFolderPath = window.electron.node
          .path()
          .join(
            window.electron.constant.USER_SERVER_INSTANCES_PATH(),
            props.info.serverId,
            'server',
          );

        window.electron.openExplorer(serverFolderPath);
      },
    },
    //* 開啟資料夾
    {
      id: 'OpenFolder',
      type: 'sub',
      sub: [
        //* 世界設定資料夾
        {
          id: 'SaveFolder',
          type: 'action',
          action() {
            setCurrentAlretWindow('');

            const worldSettingsPath = window.electron.node
              .path()
              .join(
                window.electron.constant.USER_SERVER_INSTANCES_PATH(),
                props.info.serverId,
                'server',
                'Pal/Saved',
              );

            window.electron.openExplorer(worldSettingsPath);
          },
        },
        //* 地圖檔資料夾
        {
          id: 'WorldSaveFolder',
          type: 'action',
          action() {
            setCurrentAlretWindow('');

            window.electron.openExplorer(saveGamesPath);
          },
        },
        //* 設定檔資料夾
        {
          id: 'PalConfigFolder',
          type: 'action',
          action() {
            setCurrentAlretWindow('');

            const worldSettingsPath = window.electron.node
              .path()
              .join(
                window.electron.constant.USER_SERVER_INSTANCES_PATH(),
                props.info.serverId,
                'server',
                'Pal/Saved/Config/WindowsServer',
              );

            window.electron.openExplorer(worldSettingsPath);
          },
        },
        //* GUI 實例資料夾
        // {
        //   id: 'ServerInstanceFolder',
        //   type: 'action',
        //   action() {
        //     setCurrentAlretWindow('');

        //     const worldSettingsPath = window.electron.node
        //       .path()
        //       .join(
        //         window.electron.constant.USER_SERVER_INSTANCES_PATH(),
        //         props.info.serverId,
        //       );

        //     window.electron.openExplorer(worldSettingsPath);
        //   },
        // },
      ],
    },

    //* ===
    {
      id: '',
      type: 'seperator',
    },
    //* 刪除伺服器
    {
      id: 'DeleteServer',
      type: 'action',
      shortcut: '⌫',
      color: 'red',
      action() {
        setCurrentAlretWindow('DeleteServer');
      },
    },
  ];

  const { selectedServerInstance, setSelectedServerInstance } =
    useSelectedServerInstance();

  const handleSelectServerInstance = () => {
    setSelectedServerInstance(props.info.serverId);
  };

  const { includeRunningServers } = useIsRunningServers();

  return (
    <ServerInfoProvider info={props.info}>
      <AlertDialog.Root>
        <TheContextMenu
          trigger={
            <div
              onClick={handleSelectServerInstance}
              className="flex flex-col gap-y-2 items-center w-28 h-24 p-2 pt-3 cursor-pointer rounded-lg hover:bg-bg1 relative"
            >
              {worldSettings.ServerName ? (
                <div className="relative">
                  <img
                    src={serverIcon?.image}
                    alt=""
                    className="w-12 h-12 select-none"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 flex justify-center items-center translate-y-2">
                  <Spinner size="3" />
                </div>
              )}

              <span className="text-xs text-center w-24 break-words">
                {trimWorldSettingsString(worldSettings.ServerName)}
              </span>
            </div>
          }
          content={serverOptions}
        />

        {/* {currentAlertWindow === 'edit-server' && (
        <EditServerSettings saveId={props.saveMetaData.id} />
      )}
      {currentAlertWindow === 'delete-server' && (
        <DeleteServer saveId={props.saveMetaData.id} />
      )} */}
        {currentAlertWindow === 'EditServer' && <EditServerAlert />}
        {currentAlertWindow === 'ChangeIcon' && <ChangeServerIcon />}
        {currentAlertWindow === 'DuplicateServer' && <DuplicateServerAlert />}
        {currentAlertWindow === 'DeleteServer' && <DeleteServerAlert />}
      </AlertDialog.Root>
    </ServerInfoProvider>
  );
}
