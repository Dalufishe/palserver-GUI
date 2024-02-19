import { AlertDialog, Button, Flex, Link } from "@radix-ui/themes";
import React from "react";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useGameSave from "../../../../hooks/useGameSave";
import useSteamData from "../../../../hooks/useSteamData";
import {
  electron,
  engine,
  ipcRenderer,
} from "../../../../constant/contextBridge";

export default function ServerBanList() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);

  const handleOpenBanListTxtPath = (e: any) => {
    if (engine.currentSave() === selectedGameSave) {
      electron.openExplorer(
        `./engine/steamapps/common/PalServer/Pal/Saved/SaveGames/banlist.txt`
      );
    } else {
      // 開啟存檔資料夾
      electron.openExplorer(
        `./saves/${selectedGameSave}/SaveGames/banlist.txt`
      );
    }
    e.preventDefault();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Link
          className="flex-1 text-center cursor-pointer"
          style={{ color: "white" }}
        >
          {LOCALES[appLanguage].BanList}：{currentSave?.banList?.length || 0}
        </Link>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].BanListLong}
        </AlertDialog.Title>
        <AlertDialog.Description>
          {currentSave?.banList?.map((steamId: string) => (
            <BanListItem steamId={steamId} />
          ))}
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button
              variant="soft"
              color="yellow"
              onClick={handleOpenBanListTxtPath}
            >
              {LOCALES[appLanguage].EditFromSourceFile}
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

const BanListItem = ({ steamId }: { steamId: string }) => {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();
  const steamUserData = useSteamData(steamId);

  const handleUnBan = () => {
    ipcRenderer.send("request-unban-user", selectedGameSave, steamId);
  };

  return (
    <div className="flex items-center justify-between h-8">
      <img
        src={steamUserData.avatarUrl}
        alt=""
        className="scale-75 select-none"
      />
      <span>{steamUserData.userName}</span>
      <span>{steamId}</span>
      <Button color="red" size={"1"} onClick={handleUnBan}>
        {LOCALES[appLanguage].UnBan}
      </Button>
    </div>
  );
};
