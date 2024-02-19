import { useEffect, useState } from "react";
import useSelectedGameSave from "../../redux/selectGameSave/useSelectedGameSave";
import { Button, Tabs } from "@radix-ui/themes";
import { electron, engine, ipcRenderer } from "../../constant/contextBridge";
import { useHistory } from "react-router-dom";
import useServerIsRunning from "../../hooks/useServerIsRunning";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../locales";
import DedicatedMigration from "./DedicatedMigration/DedicatedMigration";
import FourPlayersMigration from "./FourPlayersMigration/FourPlayersMigration";
import ServerDashboard from "./ServerDashboard/ServerDashboard";
import useGameSave from "../../hooks/useGameSave";
import { isUndefined } from "lodash";
import useSaveMeta from "../../hooks/useSaveMeta";
import SaveBackup from "../SaveBackup/SaveBackup";

export default function SaveSettings() {
  const history = useHistory();
  const { appLanguage } = useAppLanguage();

  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);
  const currentSaveWorldSettings = currentSave?.settings;

  const [isServerUpdate, setIsServerUpdate] = useState(false);

  const handleOpenServerPath = () => {
    if (engine.currentSave() === selectedGameSave) {
      electron.openExplorer(`./engine/steamapps/common/PalServer/Pal/Saved`);
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

  // rcon 啟用關閉

  const [RCONEnabled, setRCONEnabled] = useState(
    currentSaveWorldSettings?.RCONEnabled
  );

  useEffect(() => {
    if (isUndefined(RCONEnabled)) {
      setRCONEnabled(currentSaveWorldSettings?.RCONEnabled);
    }
  }, [currentSaveWorldSettings?.RCONEnabled]);

  const handleSwitchRCONEnabled = () => {
    ipcRenderer.send("request-set-save", selectedGameSave, {
      settings: {
        ...currentSaveWorldSettings,
        RCONEnabled: !RCONEnabled,
      },
    });
    setRCONEnabled(!RCONEnabled);
  };

  // ue4ss 啟用關閉

  const { getSaveMetaData, setSaveMetaData } = useSaveMeta();

  const saveMetaData = getSaveMetaData(selectedGameSave);
  const isUe4ssEnabled = isUndefined(saveMetaData?.ue4ssEnabled)
    ? true
    : saveMetaData?.ue4ssEnabled;

  const handleSwitchUE4SSEnabled = () => {
    setSaveMetaData(selectedGameSave, {
      ...saveMetaData,
      ue4ssEnabled: !isUe4ssEnabled,
    });
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full flex flex-col justify-between p-4 overflow-y-scroll relative">
      <div className="absolute right-6 top-6">
        <Button onClick={handleOpenServerPath}>
          {LOCALES[appLanguage].OpenServerFolder}
        </Button>
      </div>
      <Tabs.Root defaultValue="lua">
        <Tabs.List>
          <Tabs.Trigger value="lua" style={{ color: "white", fontWeight: 500 }}>
            {/* 管理面板 */}
            {LOCALES[appLanguage].Dashboard}
          </Tabs.Trigger>
          <Tabs.Trigger value="pak" style={{ color: "white", fontWeight: 500 }}>
            {/* 設定 */}
            {LOCALES[appLanguage].Setting}
          </Tabs.Trigger>
        </Tabs.List>
        <div className="py-4">
          <Tabs.Content value="lua">
            <ServerDashboard />
          </Tabs.Content>
          <Tabs.Content value="pak">
            <div className="flex flex-col gap-6 relative p-2">
              {/* 開啟伺服器資料夾 */}
              <div className="flex gap-4">
                <DedicatedMigration />
                <FourPlayersMigration />
              </div>
              <div className="flex gap-4">
                <Button
                  color="gray"
                  style={{ flex: 1 }}
                  onClick={handleSwitchRCONEnabled}
                >
                  RCON：
                  {RCONEnabled
                    ? LOCALES[appLanguage].SwitchOn
                    : LOCALES[appLanguage].SwitchOff}
                </Button>
                <Button
                  color="gray"
                  style={{ flex: 1 }}
                  onClick={handleSwitchUE4SSEnabled}
                >
                  UE4SS：
                  {isUe4ssEnabled
                    ? LOCALES[appLanguage].SwitchOn
                    : LOCALES[appLanguage].SwitchOff}
                </Button>
              </div>
              {/* 伺服器備份管理 */}
              <SaveBackup />
              {/* 更新伺服器版本 */}
              <Button
                onClick={
                  isServerRunning || isServerUpdate
                    ? () => {}
                    : handleUpdateServer
                }
                color="gray"
              >
                {isServerUpdate
                  ? LOCALES[appLanguage].ServerIsUpdating
                  : LOCALES[appLanguage].UpdateServerToLatestVersion}
              </Button>
            </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
