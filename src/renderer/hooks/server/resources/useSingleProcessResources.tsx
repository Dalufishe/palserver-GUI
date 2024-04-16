import { useEffect, useState } from 'react';
import Channels from '../../../../main/ipcs/channels';

const useSingleProcessResources = (processId: number) => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memUsage, setMemUsage] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      window.electron.ipcRenderer
        .invoke(Channels.getSingleProcessResources, processId)
        .then((res: any) => {
          setCpuUsage(Math.round(res.cpuUsage * 100) / 100);
          setMemUsage(Math.round(res.memUsage * 100) / 100);
        });
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, [processId]);

  return { cpuUsage, memUsage };
};

export default useSingleProcessResources;
