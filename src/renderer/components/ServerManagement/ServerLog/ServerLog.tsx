import React, { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../redux/selectedServerInstance/useSelectedServerInstance';
import useTranslation from '../../../hooks/useTranslation';
import { TextField, Theme } from '@radix-ui/themes';
import Boardcastbar from './Boardcastbar/Boardcastbar';

const logSheet = [
  ['(chat)', ''],
  ['isPVPEnabled = False', 'PVP Mode = False'],
  // ['invoked', '調用'],
  // ['args', '參數'],
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
  const { t } = useTranslation();

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
        setLog(applySheet(data).split('\n').slice(38));
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
    <div className="my-4 flex flex-col gap-8">
      <div className="w-full h-[calc(100vh-284px)] overflow-y-scroll rounded-md">
        {log.length ? (
          <div className="flex flex-col-reverse gap-2 p-4">
            {log
              .slice()
              .reverse()
              .map((l) => (
                <div className="font-mono">{l}</div>
              ))}
          </div>
        ) : (
          <div>
            <div className="text-2xl opacity-60 p-4">{t('ServerHasNoLog')}</div>
          </div>
        )}
      </div>
      <Boardcastbar />
    </div>
  );
}
