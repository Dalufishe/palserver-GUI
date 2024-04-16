import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useComputerResources = (
  callback?: (cpuUsage: number, memUsage: number) => void,
) => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memUsage, setMemUsage] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      window.electron.ipcRenderer
        .invoke(Channels.getComputerResources)
        .then((res: any) => {
          setCpuUsage(res.cpuUsage);
          setMemUsage(Math.round(res.memUsage * 100) / 100);
        });
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  useEffect(() => {
    if (callback) callback(cpuUsage, memUsage);
  }, [cpuUsage, memUsage]);

  return { cpuUsage, memUsage };
};

export default useComputerResources;
