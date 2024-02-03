import React from "react";
import useSelectedGameSave from "../redux/selectGameSave/useSelectedGameSave";
import { Button } from "@radix-ui/themes";
import { electron } from "../constant/contextBridge";

export default function SaveSettings() {
  const { selectedGameSave } = useSelectedGameSave();

  const handleOpenSave = () => {
    electron.openExplorer(`./saves/${selectedGameSave}/SaveGames`);
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll">
      <div className="flex flex-col gap-2">
        <Button color="gray" onClick={handleOpenSave}>
          開啟存檔資料夾
        </Button>
        <code className="text-white">
          {electron
            .path()
            .join(
              electron.__dirname(),
              `./saves/${selectedGameSave}/SaveGames`
            )}
        </code>
      </div>
    </div>
  );
}
