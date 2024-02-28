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

export default function ServerDashboard() {
  const { appLanguage } = useAppLanguage();
  const history = useHistory();

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

  return isRCONEnabled ? (
    <div className="p-2 w-full">
      {/* 玩家列表 */}
      <div className="w-full h-[calc(100vh-340px)] rounded-lg bg-bg1 overflow-auto">
        <PlayerListHeading />
        <div className="flex flex-col">
          {playerList?.map((player: any) => (
            <PlayerListItem {...player} />
          ))}
        </div>
      </div>
      {/* 伺服器狀態 */}
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
      {/* 底部輸入框 */}
      <ServerBoardcast />
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

const PlayerListItem = ({
  name,
  playeruid,
  steamid,
}: {
  name: string;
  playeruid: string;
  steamid: string;
}) => {
  const { appLanguage } = useAppLanguage();

  const rconOptions = useRconOptions();
  const steamData = useSteamData(steamid);

  const handleKickUser = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `KickPlayer ${steamid}`
    );
  };
  const handleBanUser = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `BanPlayer ${steamid}`
    );
  };

  return (
    <div className="w-full flex p-4 pb-1 text-sm">
      <div className="flex-1 flex justify-center items-center gap-1">
        <img
          src={steamData.avatarUrl}
          alt=""
          className="scale-75 select-none"
        />
        <Link style={{ color: "white" }}>{name}</Link>
      </div>
      <Link
        style={{ color: "white" }}
        className="flex-1 flex justify-center items-center"
      >
        {playeruid}
      </Link>
      <Link
        style={{ color: "white" }}
        className="flex-1 flex justify-center items-center"
      >
        {steamid}
      </Link>
      <div className="flex-1 flex justify-center items-center gap-2">
        {/* 踢出 */}
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button size={"1"}>{LOCALES[appLanguage].KickPlayer}</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>
              {LOCALES[appLanguage].KickPlayer} {name}
            </AlertDialog.Title>
            <AlertDialog.Description>
              {formatLocale(LOCALES[appLanguage].KickPlayerDesc, [
                name,
                playeruid,
                name,
              ])}
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  {LOCALES[appLanguage].Cancel}
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="yellow" onClick={handleKickUser}>
                  {LOCALES[appLanguage].ConfirmKick}
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
        {/* 封鎖 */}
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button size={"1"} color="red">
              {LOCALES[appLanguage].Ban}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>封鎖 {name}</AlertDialog.Title>
            <AlertDialog.Description>
              {formatLocale(LOCALES[appLanguage].BanDesc, [
                name,
                playeruid,
                name,
              ])}
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  {LOCALES[appLanguage].Cancel}
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red" onClick={handleBanUser}>
                  {LOCALES[appLanguage].ConfirmBan}
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  );
};
