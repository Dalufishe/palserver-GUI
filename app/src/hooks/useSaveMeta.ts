import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useSaveMeta = () => {
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    ipcRenderer.send("request-save-metadata");

    ipcRenderer.on(`save-metadata-response`, (event, metadata) => {
      setMeta(metadata);
    });
    return () => {
      ipcRenderer.removeAllListeners(`save-metadata-response`);
    };
  }, []);

  return meta;
};

export default useSaveMeta;
