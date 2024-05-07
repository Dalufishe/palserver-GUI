import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';

const useServerOnlinePlayers = (serverId: string) => {
  const { includeRunningServers } = useIsRunningServers();

  const [players, setPlayers] = useState<
    {
      name: string;
      playerId: string;
      userId: string;
      ip: string;
      ping: number;
      location_x: number;
      location_y: number;
      level: number;
    }[]
  >([]);

  useEffect(() => {
    const i = setInterval(() => {
      window.electron.ipcRenderer
        .invoke(Channels.sendRestAPI, serverId, '/players')
        .then((data: any) => {
          setPlayers(data?.players);
        })
        .catch((error) => {});
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);

  return players;
};

export default useServerOnlinePlayers;
