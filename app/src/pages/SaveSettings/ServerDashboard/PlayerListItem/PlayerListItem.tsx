import { AlertDialog, Button, Flex, Link } from "@radix-ui/themes";
import { ipcRenderer } from "../../../../constant/contextBridge";
import useRconOptions from "../../../../hooks/useRconOptions";
import useSteamData from "../../../../hooks/useSteamData";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";
import formatLocale from "../../../../utils/formatLocale";
import PlayerMoreAction from "./PlayerMoreAction/PlayerMoreAction";

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
    <div className="w-full flex p-3 pb-1 h-12 text-sm">
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
        {/* 其他操作 */}
        <PlayerMoreAction playeruid={playeruid} />
      </div>
    </div>
  );
};

export default PlayerListItem;
