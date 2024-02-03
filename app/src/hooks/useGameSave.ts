import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useGameSave = (savePath: string) => {
  const [save, setSave] = useState<any>({});

  useEffect(() => {
    ipcRenderer.send("request-save", savePath);

    ipcRenderer.on(`save-response-${savePath}`, (event, save) => {
      setSave(save);
    });
    return () => {
      ipcRenderer.removeAllListeners(`save-response-${savePath}`);
    };
  }, [savePath]);
 
  return save;
};

export default useGameSave;
