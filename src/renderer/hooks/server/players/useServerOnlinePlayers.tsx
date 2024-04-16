import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useServerOnlinePlayers = (serverId: string) => {
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
        .invoke(Channels.getRestAPI, '/players', serverId)
        .then((data: any) => {
          setPlayers(data?.players);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);

  return players;
};

export default useServerOnlinePlayers;
