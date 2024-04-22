import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';
import useIsRunningServers from '../../../redux/isRunningServers/useIsRunningServers';

const useServerMetrics = (serverId: string) => {
  const { includeRunningServers } = useIsRunningServers();

  const [serverMetrics, setServerMetrics] = useState<{
    currentplayernum: number;
    serverfps: number;
    serverframetime: number;
    maxplayernum: number;
    uptime: number;
  }>({
    currentplayernum: 0,
    serverfps: 0,
    serverframetime: 0,
    maxplayernum: 0,
    uptime: 0,
  });

  useEffect(() => {
    const i = setInterval(() => {
      window.electron.ipcRenderer
        .invoke(Channels.sendRestAPI, serverId, '/metrics')
        .then((data: any) => {
          setServerMetrics(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [serverId]);

  return serverMetrics;
};

export default useServerMetrics;
