import React, { useEffect } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';

export default function BootServerButton() {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  const {
    addIsRunningServers,
    removeIsRunningServers,
    includeRunningServers,
    isRunningServers,
  } = useIsRunningServers();

  const isServerRunning = includeRunningServers(selectedServerInstance);

  const handleBootServer = () => {
    window.electron.ipcRenderer.sendMessage(
      Channels.execStartServer,
      selectedServerInstance,
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
      (serverId, processId) => {
        addIsRunningServers(serverId, processId);
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
    <div onClick={isServerRunning ? handleShutDownServer : handleBootServer}>
      <div className="w-full h-10 bg-gray-200 hover:bg-slate-50 text-bg1 rounded-lg flex items-center justify-center select-none cursor-pointer">
        {isServerRunning ? t('CloseServer') : t('BootServer')}
      </div>
    </div>
  );
}
