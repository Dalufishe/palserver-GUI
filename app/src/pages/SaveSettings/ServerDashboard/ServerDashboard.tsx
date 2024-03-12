import { AlertDialog, Button, Flex, Kbd, Link } from "@radix-ui/themes";
import useServerInfo from "../../../hooks/useServerInfo";
import useComputerResources from "../../../hooks/useComputerResources";
import useSteamData from "../../../hooks/useSteamData";
import ServerBoardcast from "./ServerBoardcast/ServerBoardcast";
import LOCALES from "../../../locales";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import { ipcRenderer } from "../../../constant/contextBridge";
import useRconOptions from "../../../hooks/useRconOptions";
import ServerBanList from "./ServerBanList/ServerBanList";
import formatLocale from "../../../utils/formatLocale";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useGameSave from "../../../hooks/useGameSave";
import { useHistory } from "react-router-dom";
import PlayerListItem from "./PlayerListItem/PlayerListItem";
import { useState } from "react";
import { cn } from "../../../utils/cn";

export default function ServerDashboard() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);
  const currentSaveWorldSettings = currentSave?.settings;
  const isRCONEnabled = currentSaveWorldSettings?.RCONEnabled;

  const serverInfo = useServerInfo();
  const playerList = serverInfo.playerlist;

  const { cpuUsage, memUsage } = useComputerResources();

  const handleEnabledRCON = () => {
    ipcRenderer.send("request-set-save", selectedGameSave, {
      settings: { ...currentSaveWorldSettings, RCONEnabled: true },
    });
    window.location.reload();
  };

  const [broadcastEnter, setBroadCastEnter] = useState();

  return isRCONEnabled ? (
    <div className="p-2 w-full">
      {/* 玩家列表 */}
      <div
        className={cn(
          "w-full rounded-lg bg-bg1 overflow-auto",
          broadcastEnter ? "h-[calc(100vh-508px)]" : "h-[calc(100vh-340px)]"
        )}
      >
        <PlayerListHeading />
        <div className="flex flex-col">
          {playerList?.map((player: any) => (
            <PlayerListItem {...player} />
          ))}
        </div>
      </div>
      {/* 伺服器狀態 */}
      {!!broadcastEnter || (
        <div className="w-full h-12 mt-6 bg-bg1 flex rounded-lg flex items-center pl-6 pr-2 select-none">
          <div className="flex-1 text-center cursor-pointer">
            CPU：{cpuUsage}%
          </div>
          <div className="flex-1 text-center cursor-pointer">
            {LOCALES[appLanguage].RAM}：{memUsage}%
          </div>
          <div className="flex-1 text-center cursor-pointer">
            {LOCALES[appLanguage].OnlinePlayer}：{playerList?.length || 0}
          </div>
          {/* 黑名單 */}
          <ServerBanList />
        </div>
      )}

      {/* 底部輸入框 */}
      <ServerBoardcast
        onTextEnter={(v) => {
          setBroadCastEnter(v);
        }}
      />
    </div>
  ) : (
    <div className="p-2 w-full">
      {/* 啟用 rcon */}
      <div>
        {LOCALES[appLanguage].RCONEnabledDesc}
        <Button size={"1"} onClick={handleEnabledRCON}>
          {LOCALES[appLanguage].RCONEnabled}
        </Button>
      </div>
      {/* 遷移存檔 */}
      <div className="mt-2">{LOCALES[appLanguage].MigrateSaveDesc}</div>
    </div>
  );
}

const PlayerListHeading = () => {
  const { appLanguage } = useAppLanguage();

  return (
    <div className="w-full flex p-4 pb-1">
      <div className="flex-1 flex justify-center items-center">
        {LOCALES[appLanguage].PlayerName}
      </div>
      <div className="flex-1 flex justify-center items-center">
        {LOCALES[appLanguage].PlayerID}
      </div>
      <div className="flex-1 flex justify-center items-center">Steam ID</div>
      <div className="flex-1 flex justify-center items-center">
        {LOCALES[appLanguage].Other}
      </div>
    </div>
  );
};
