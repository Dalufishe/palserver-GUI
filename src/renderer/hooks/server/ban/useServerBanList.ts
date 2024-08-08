import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useServerBanList = (serverId: string) => {
  const [banList, setBanList] = useState<string[]>([]);
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getServerBanList, serverId)
      .then((l) => {
        setBanList(l);
      });
  }, [serverId]);

  return banList;
};

export default useServerBanList
