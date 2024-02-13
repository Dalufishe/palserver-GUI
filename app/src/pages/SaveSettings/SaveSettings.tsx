import React, { useState } from "react";
import useSelectedGameSave from "../../redux/selectGameSave/useSelectedGameSave";
import { Blockquote, Button, Link, Tooltip } from "@radix-ui/themes";
import { electron, engine, ipcRenderer } from "../../constant/contextBridge";
import { useHistory } from "react-router-dom";
import useServerIsRunning from "../../hooks/useServerIsRunning";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../locales";
import formatLocale from "../../utils/formatLocale";
import DedicatedMigration from "./DedicatedMigration/DedicatedMigration";
import FourPlayersMigration from "./FourPlayersMigration/FourPlayersMigration";

export default function SaveSettings() {
  const history = useHistory();
  const { appLanguage } = useAppLanguage();

  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();

  const [isServerUpdate, setIsServerUpdate] = useState(false);

  const handleOpenServerPath = () => {
    if (engine.currentSave() === selectedGameSave) {
      electron.openExplorer(
        `./engine/steamapps/common/PalServer/Pal/Saved`
      );
    } else {
      // 開啟存檔資料夾
      electron.openExplorer(`./saves/${selectedGameSave}`);
    }
  };

  const handleUpdateServer = () => {
    setIsServerUpdate(true);
    ipcRenderer.send("request-update-server");
    ipcRenderer.on("update-server-response:done", () => {
      setIsServerUpdate(false);
      window.alert(LOCALES[appLanguage].ServerUpdateDone);
      ipcRenderer.removeAllListeners("update-server-response:done");
    });
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full flex flex-col justify-between p-4 overflow-y-scroll">
      <div className="flex flex-col gap-4 h-full relative">
        {/* 開啟伺服器資料夾 */}
        <Button onClick={handleOpenServerPath}>
          {LOCALES[appLanguage].OpenServerFolder}
        </Button>
        <div className="flex gap-4">
          <DedicatedMigration />
          <FourPlayersMigration />
        </div>
      </div>
      {/* 更新伺服器版本 */}
      <Button
        onClick={
          isServerRunning || isServerUpdate ? () => {} : handleUpdateServer
        }
        color="gray"
      >
        {isServerUpdate
          ? LOCALES[appLanguage].ServerIsUpdating
          : LOCALES[appLanguage].UpdateServerToLatestVersion}
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
