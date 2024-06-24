import React, { useEffect, useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';
import CongratBootServerAlert from './CongratBootServerAlert/CongratBootServerAlert';
import { AlertDialog, ContextMenu } from '@radix-ui/themes';
import useLocalState from '../../../hooks/useLocalState';
import useServerInfo from '../../../hooks/server/info/useServerInfo';

export default function BootServerButton() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const {
    addIsRunningServers,
    removeIsRunningServers,
    includeRunningServers,
    isRunningServers,
  } = useIsRunningServers();

  const { serverInfo } = useServerInfo(selectedServerInstance);

  const isServerRunning = includeRunningServers(selectedServerInstance);

  const handleBootServer = () => {
    // setting query port (thanks Pumpkin at Hydra Network <3)
    const queryPorts = isRunningServers.map((server) => server.queryPort);
    let queryPort = 27015;
    while (queryPorts.includes(queryPort)) {
      queryPort = Number(
        '270' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10),
      );
    }

    // start the server
    window.electron.ipcRenderer.sendMessage(
      Channels.execStartServer,
      selectedServerInstance,
      queryPort,
    );
  };

  const handleShutDownServer = () => {
    const processId = isRunningServers.find(
      (server) => server.serverId === selectedServerInstance,
    )?.processId as number;

    window.electron.ipcRenderer.sendMessage(
      Channels.execShutdownServer,
      processId,
    );
  };

  useEffect(() => {
    const done = window.electron.ipcRenderer.on(
      Channels.execStartServerReply.DONE,
      (serverId, processId, queryPort) => {
        addIsRunningServers(serverId, processId, queryPort);
      },
    );
    const exit = window.electron.ipcRenderer.on(
      Channels.execStartServerReply.EXIT,
      (serverId) => {
        removeIsRunningServers(serverId);
      },
    );

    return () => {
      done();
      exit();
    };
  }, [addIsRunningServers, removeIsRunningServers]);

  return (
    <div>
      <AlertDialog.Trigger
        onClick={
          isServerRunning
            ? serverInfo?.UseIndependentProcess
              ? () => {}
              : handleShutDownServer
            : handleBootServer
        }
      >
        <div className="w-full h-10 bg-gray-200 hover:bg-slate-50 text-bg1 rounded-lg flex items-center justify-center select-none cursor-pointer">
          {serverInfo?.UseIndependentProcess
            ? isServerRunning
              ? t('ServerIsRunning')
              : t('BootServer')
            : isServerRunning
            ? t('CloseServer')
            : t('BootServer')}
        </div>
      </AlertDialog.Trigger>
    </div>
  );
}
