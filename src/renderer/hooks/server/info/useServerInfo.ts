import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import { ServerInstanceSetting } from '../../../../types/ServerInstanceSetting.types';

/** 用 redux 搭配 refresh 函示改寫 */

const useServerInfo = (serverId: string) => {
  const [serverInfo, setServerInfo] = useState<ServerInstanceSetting>();
  useEffect(() => {
    const i = setInterval(() => {
      if (serverId) {
        window.electron.ipcRenderer
          .invoke(Channels.getServerInfo, serverId)
          .then((info) => {
            setServerInfo(info);
          });
      }
    }, 300);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);
  return {
    serverInfo,
    setServerInfo: (newServerInfo: ServerInstanceSetting) => {
      window.electron.ipcRenderer.invoke(
        Channels.setServerInfo,
        serverId,
        newServerInfo,
      );
    },
  };
};

export default useServerInfo;
