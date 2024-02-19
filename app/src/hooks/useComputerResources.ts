import { useEffect, useState } from "react";
import { osu } from "../constant/contextBridge";

const useComputerResources = () => {
  const [cpuUsage, setCpuUsage] = useState("0");
  const [memUsage, setMemUsage] = useState("0");

  useEffect(() => {
    const i = setInterval(() => {
      osu.cpu.usage().then((cpuPercentage) => {
        setCpuUsage(cpuPercentage.toFixed(2));
      });
      osu.mem.used().then((memInfo) => {
        setMemUsage(
          ((memInfo.usedMemMb / memInfo.totalMemMb) * 100).toFixed(2)
        );
      });
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  return { cpuUsage, memUsage };
};

export default useComputerResources;
