import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useWorldSettings = () => {
  const [worldSettings, setWorldSettings] = useState<any>({});

  // 請求設定
  useEffect(() => {
    ipcRenderer.send("request-world-settings");

    // 當伺服器接收訊息
    ipcRenderer.on("world-settings-response", (event, settings) => {
      setWorldSettings(settings);
    });
    return () => {
      ipcRenderer.removeAllListeners(`world-settings-response`);
    };
  }, []);

  return worldSettings;
};

export default useWorldSettings;
