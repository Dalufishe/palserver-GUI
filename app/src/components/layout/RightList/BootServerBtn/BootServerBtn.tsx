import React, { useEffect, useState } from "react";
import { ipcRenderer } from "../../../../constant/contextBridge";
import { cn } from "../../../../utils/cn";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../../hooks/useServerIsRunning";
import { useHistory } from "react-router-dom";

export default function BootServerBtn({ disabled }: { disabled: boolean }) {
  const history = useHistory();

  const { selectedGameSave } = useSelectedGameSave();

  const isServerRunning = useServerIsRunning();

  // 啟動伺服器
  const handleBootServer = () => {
    history.push("/server-settings");

    // 將上一個存檔保存
    ipcRenderer.send("request-set-engine-to-save");
    ipcRenderer.on("set-engine-to-save-response:done", () => {
    // 將指定存檔存入引擎
    ipcRenderer.send("request-set-save-to-engine", selectedGameSave);
    ipcRenderer.on("set-save-to-engine-response:done", (event, data) => {
      // 啟動伺服器
      ipcRenderer.send("request-exec-server");
      ipcRenderer.removeAllListeners("set-save-to-engine-response:done");
    });
    ipcRenderer.removeAllListeners("set-engine-to-save-response:done");
    });
  };

  // 關閉伺服器
  useEffect(() => {
    // const i = setInterval(() => {
    //   // 每分鐘自動存檔
    //   ipcRenderer.send("request-set-engine-to-save");
    // }, 60 * 1000);

    // 伺服器關閉保存存檔
    ipcRenderer.on("exec-server-response:exit", (event) => {
      ipcRenderer.send("request-set-engine-to-save");
    });

    return () => {
      ipcRenderer.removeAllListeners("exec-server-response:exit");
      // clearInterval(i);
    };
  }, []);

  return (
    <div
      onClick={disabled ? () => {} : handleBootServer}
      className={cn(
        "w-full h-10 bg-gray-200 text-bg1 rounded-lg flex items-center justify-center select-none",
        disabled ? "cursor-not-allowed" : " cursor-pointer"
      )}
    >
      {isServerRunning ? "伺服器執行中" : "啟動伺服器"}
    </div>
  );
}
