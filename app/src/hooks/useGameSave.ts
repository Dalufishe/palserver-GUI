import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useGameSave = (savePath: string) => {
  const [save, setSave] = useState<any>({});

  useEffect(() => {
    ipcRenderer.send("request-save", savePath);

    const listener = (event, save) => {
      setSave(save);
    };

    ipcRenderer.on(`save-response-${savePath}`, listener);
  }, [savePath]);

  useEffect(() => {
    return () => {
      ipcRenderer.removeAllListeners(`save-response-${savePath}`);
    };
  }, []);

  return save;
};

export default useGameSave;
