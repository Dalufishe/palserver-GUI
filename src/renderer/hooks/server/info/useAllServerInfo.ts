import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';

/** 用 redux 搭配 refresh 函示改寫 */

const useAllServerInfo = () => {
  const [serverInfo, setServerInfo] = useState<ServerInstanceSetting[]>([]);
  useEffect(() => {
    const i = setInterval(() => {
      window.electron.ipcRenderer
        .invoke(Channels.getAllServerInfo)
        .then((info) => {
          setServerInfo(info);
        });
    }, 200);
    return () => {
      clearInterval(i);
    };
  }, []);
  return serverInfo;
};

export default useAllServerInfo;
