import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const usePakLogicMods = (serverId: string) => {
  const [luaMods, setLuaMods] = useState<
    { name: string; isDirectory: boolean }[]
  >([]);

  useEffect(() => {
    const i = setInterval(() => {
      if (serverId) {
        window.electron.ipcRenderer
          .invoke(Channels.getPakLogicMods, serverId)
          .then((mods) => {

            setLuaMods(mods);
          });
      }
    }, 300);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);

  return luaMods;
};

export default usePakLogicMods;
