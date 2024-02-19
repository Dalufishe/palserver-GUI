import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useSteamData = (steamId: string) => {
  const [steamData, setSteamData] = useState<any>({});
  // 請求設定
  useEffect(() => {
    ipcRenderer.send("request-steam-data", steamId);

    // 當伺服器接收訊息
    ipcRenderer.on("steam-data-response", (event, data) => {
      setSteamData(data);
    });
    return () => {
      ipcRenderer.removeAllListeners(`steam-data-response`);
    };
  }, []);

  return steamData;
};

export default useSteamData;
