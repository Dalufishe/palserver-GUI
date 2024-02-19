import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";
import useWorldSettings from "./useWorldSettings";
import useRconOptions from "./useRconOptions";

const useServerInfo = () => {
  const [serverInfo, setServerInfo] = useState<any>({});

  const rconOptions = useRconOptions();

  // 請求設定
  useEffect(() => {
    ipcRenderer.send("request-server-info", rconOptions);

    const i = setInterval(() => {
      ipcRenderer.send("request-server-info", rconOptions);
    }, 1000);

    // 當伺服器接收訊息
    ipcRenderer.on("server-info-response", (event, serverInfo) => {
      setServerInfo(serverInfo);
    });
    return () => {
      ipcRenderer.removeAllListeners(`server-info-response`);
      clearInterval(i);
    };
  }, [rconOptions.port, rconOptions.password]);

  return serverInfo;
};

export default useServerInfo;
