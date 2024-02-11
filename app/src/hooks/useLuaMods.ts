import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useLuaMods = () => {
  const [mods, setMods] = useState<any[]>([]);

  useEffect(() => {
    ipcRenderer.send("request-lua-mods");
    const i = setInterval(() => {
      ipcRenderer.send("request-lua-mods");
    }, 1000);

    ipcRenderer.on(`lua-mods-response`, (event, data) => {
      setMods(data.mods);
    });

    return () => {
      clearInterval(i);
      ipcRenderer.removeAllListeners("lua-mods-response");
    };
  }, []);

  return {
    mods,
  };
};

export default useLuaMods;
