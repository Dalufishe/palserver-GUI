import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useServerIsRunning = () => {
  const [isServerRunning, setIsServerRunning] = useState(false);

  useEffect(() => {
    // 當伺服器接收訊息
    ipcRenderer.on("exec-server-response:done", (event) => {
      setIsServerRunning(true);
    });

    // 當伺服器關閉
    ipcRenderer.on("exec-server-response:exit", (event) => {
      setIsServerRunning(false);
    });

    return () => {
      ipcRenderer.removeAllListeners("exec-server-response:done");
      ipcRenderer.removeAllListeners("exec-server-response:exit");
    };
  }, []);

  return isServerRunning;
};

export default useServerIsRunning;
