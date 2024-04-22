import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useCorrectSaveGamesPath = (serverId: string) => {
  const [path, setPath] = useState('');
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getCorrectSaveGamesPath, serverId || '')
      .then((p) => {
        setPath(p);
      });
  }, [serverId]);
  return path;
};

export default useCorrectSaveGamesPath;
