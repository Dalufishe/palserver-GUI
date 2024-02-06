import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";

const useSaveMeta = () => {
  const [meta, setMeta] = useState<any[]>([]);

  useEffect(() => {
    ipcRenderer.send("request-save-metadata");

    ipcRenderer.on(`save-metadata-response`, (event, metadata) => {
      setMeta(metadata);
    });
    // return () => {
    //   ipcRenderer.removeAllListeners(`save-metadata-response`);
    // };
  }, []);

  return {
    metaData: meta,
    setMetaData: (data: any[]) => {
      ipcRenderer.send("request-set-save-metadata", data);
    },
    getSaveMetaData(saveId: string) {
      return meta.filter((m) => m.id === saveId)[0];
    },
  };
};

export default useSaveMeta;
