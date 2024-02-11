import React, { useState } from "react";
import useSelectedGameSave from "../redux/selectGameSave/useSelectedGameSave";
import { Blockquote, Button, Callout, Tooltip } from "@radix-ui/themes";
import { electron, ipcRenderer } from "../constant/contextBridge";
import { Link, useHistory } from "react-router-dom";
import useServerIsRunning from "../hooks/useServerIsRunning";

export default function SaveSettings() {
  const history = useHistory();
  const isServerRunning = useServerIsRunning();

  const { selectedGameSave } = useSelectedGameSave();

  const [isServerUpdate, setIsServerUpdate] = useState(false);

  const handleOpenServerPath = () => {
    electron.openExplorer(`./saves/${selectedGameSave}`);
  };

  const handleOpenSave = () => {
    electron.openExplorer(`./saves/${selectedGameSave}/SaveGames`);
  };

  const handleUpdateServer = () => {
    setIsServerUpdate(true);
    ipcRenderer.send("request-update-server");
    ipcRenderer.on("update-server-response:done", () => {
      setIsServerUpdate(false);
      window.alert("伺服器更新完畢！");
      ipcRenderer.removeAllListeners("update-server-response:done");
    });
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full flex flex-col justify-between p-4 overflow-y-scroll">
      <div className="flex flex-col gap-2 h-full relative">
        <Tooltip
          content={electron
            .path()
            .join(electron.__dirname(), `./saves/${selectedGameSave}`)}
        >
          <Button onClick={handleOpenServerPath}>開啟伺服器資料夾</Button>
        </Tooltip>
        <Blockquote>
          這是伺服器的資料夾路徑，您可以操作他來調整細節設定，或將已存在的伺服器存檔遷移到
          palserver GUI。請注意，資料夾內的{" "}
          <span className="text-blue-400">.pal</span> 文件請勿修改、覆蓋或刪除。
        </Blockquote>
      </div>

      <Button
        onClick={
          isServerRunning || isServerUpdate ? () => {} : handleUpdateServer
        }
        color="gray"
      >
        {isServerUpdate ? "伺服器更新中..." : "更新伺服器到最新版本"}
      </Button>

      {/* <Button
          color="gray"
          onClick={() => {
            history.push("/save-backup");
          }}
        >
          自動備份存檔恢復
        </Button>

        <Blockquote color="gray" style={{ color: "white" }}>
          palserver GUI
          會定期自動備份存檔。您可以操作此界面，回溯到特定時間點的存檔。
        </Blockquote> */}
    </div>
  );
}
