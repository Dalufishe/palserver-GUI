import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const usePakMods = () => {
  const [mods, setMods] = useState<any[]>([]);

  useEffect(() => {
    ipcRenderer.send("request-pak-mods");
    const i = setInterval(() => {
      ipcRenderer.send("request-pak-mods");
    }, 1000);

    ipcRenderer.on(`pak-mods-response`, (event, data) => {
      setMods(data.mods);
    });

    return () => {
      clearInterval(i);
      ipcRenderer.removeAllListeners("pak-mods-response");
    };
  }, []);

  return {
    mods,
  };
};

export default usePakMods;
