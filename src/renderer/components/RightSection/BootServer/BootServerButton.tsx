import React, { useEffect } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';
import { AlertDialog } from '@radix-ui/themes';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../../../firebase/db';
import { VERSION } from '../../../../constant/app';

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

  // 啟動伺服器
  const handleBootServer = async () => {
    try {
      // collect data
      const docRef = doc(db.ServerInfo, VERSION);
      const docSnap = await getDoc(docRef);
      const prev_boot_count = docSnap.data()?.boot_count || 0;
      await updateDoc(docRef, {
        boot_count: prev_boot_count + 1,
      });
    } catch (e) {
      //
    }

    // setting query port (thanks Pumpkin at Hydra Network <3)
    const queryPorts = isRunningServers.map((server) => server.queryPort);
    let queryPort = 27015;
    while (queryPorts.includes(queryPort)) {
      queryPort = Number(
        `270${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
      );
    }

    // start the server
    window.electron.ipcRenderer.sendMessage(
      Channels.execStartServer,
      selectedServerInstance,
      queryPort,
    );
  };

  // 關閉伺服器
  const handleShutDownServer = () => {
    const processId = isRunningServers.find(
      (server) => server.serverId === selectedServerInstance,
    )?.processId as number;

    // 確保伺服器已啟用 (否則無法執行 rcon 指令)
    window.electron.ipcRenderer.sendMessage(
      Channels.execShutdownServer,
      selectedServerInstance,
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
      <div
        onClick={isServerRunning ? handleShutDownServer : handleBootServer}
        className="w-full h-10 bg-gray-200 hover:bg-slate-50 text-bg1 rounded-lg flex items-center justify-center select-none cursor-pointer"
      >
        {isServerRunning ? t('CloseServer') : t('BootServer')}
      </div>
    </div>
  );
}
