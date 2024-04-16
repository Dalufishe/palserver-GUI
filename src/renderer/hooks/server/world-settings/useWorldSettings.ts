import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

/** 用 redux 搭配 refresh 函示改寫 */

const useWorldSettings = (serverId: string) => {
  const [worldSettings, setWorldSettings] = useState<any>({});
  useEffect(() => {
    const i = setInterval(() => {
      if (serverId) {
        window.electron.ipcRenderer
          .invoke(Channels.getWorldSettings, serverId)
          .then((info) => {
            setWorldSettings(info);
          });
      }
    }, 200);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);
  return {
    worldSettings,
    setWorldSettings: (newWorldSettings: any) => {
      window.electron.ipcRenderer.invoke(
        Channels.setWorldSettings,
        serverId,
        newWorldSettings,
      );
    },
  };
};

export default useWorldSettings;
