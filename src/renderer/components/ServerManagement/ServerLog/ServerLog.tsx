import React, { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';

const logSheet = [
  ['(chat)', ''],
  // ['has logged in with', '登入 > '],
  // ['has logged out', '已登出'],
];

const applySheet = (log: string) => {
  let result = log;

  logSheet.forEach((sheet) => {
    result = result.replaceAll(sheet[0], sheet[1]);
  });

  return result;
};

export default function ServerLog({
  managementMode,
  onNewLog,
}: {
  managementMode: string;
  onNewLog: (logCount: number) => void;
}) {
  const { selectedServerInstance } = useSelectedServerInstance();

  const [log, setLog] = useState<string[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      Channels.getServerLog,
      selectedServerInstance,
    );

    const getLog = window.electron.ipcRenderer.on(
      Channels.getServerLogReply.DATA,
      (data: string) => {
        setLog(applySheet(data).split('\n').slice(37));
      },
    );
    return () => {
      getLog();
    };
  }, [selectedServerInstance]);

  const [prevLog, setPrevLog] = useState<string[]>([]);
  useEffect(() => {
    if (managementMode === 'log') {
      setPrevLog(log);
    }
  }, [managementMode, log]);

  useEffect(() => {
    onNewLog(log.length - prevLog.length);
  }, [log.length, prevLog.length]);

  return (
    <div className="mt-4 w-full h-[calc(100vh-200px)] overflow-y-scroll rounded-md font-mono">
      <div className="flex flex-col gap-2 p-4">
        {log.map((l) => (
          <div>{l}</div>
        ))}
      </div>
    </div>
  );
}