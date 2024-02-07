import React from "react";
import useSelectedGameSave from "../redux/selectGameSave/useSelectedGameSave";
import { Button, Callout, Tooltip } from "@radix-ui/themes";
import { electron } from "../constant/contextBridge";

export default function SaveSettings() {
  const { selectedGameSave } = useSelectedGameSave();

  const handleOpenServerPath = () => {
    electron.openExplorer(`./saves/${selectedGameSave}`);
  };

  const handleOpenSave = () => {
    electron.openExplorer(`./saves/${selectedGameSave}/SaveGames`);
  };

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll">
      <div className="flex flex-col gap-2 h-full relative">
        <Tooltip
          content={electron
            .path()
            .join(electron.__dirname(), `./saves/${selectedGameSave}`)}
        >
          <Button onClick={handleOpenServerPath}>開啟伺服器資料夾</Button>
        </Tooltip>

        <span className="text-xs font-normal">
          這是伺服器的資料夾路徑，您可以開啟他來將既有的伺服器檔案複製貼上
          遷移至 palserver
          GUI。您也可以在這邊透過編輯原始文件的方式修改世界設定、玩家及插件存檔文件。請注意，
          請勿修改或刪除本工具生成的 <code>.pal</code>{" "}
          檔案，否則會造成非預期的錯誤。
        </span>
        <Tooltip
          content={electron
            .path()
            .join(
              electron.__dirname(),
              `./saves/${selectedGameSave}/SaveGames`
            )}
        >
          <Button color="gray" onClick={handleOpenSave}>
            開啟存檔資料夾
          </Button>
        </Tooltip>
        <span className="text-xs font-normal">
          這是伺服器的存檔路徑，僅包含玩家及地圖資料 (不包含地圖設定檔或插件)
          您可以操作他對存檔做備份。
        </span>
        {/*  */}
        {/* <div className="absolute bottom-0 text-xs font-normal">
          ※ 請注意，除了上兩個資料夾以外的路徑 (更上層)
          並不建議您修改。palserver GUI
          擁有自己的伺服器管理系統，擅自改變檔案結構可能會造成應用程式異常或存檔損毀。
        </div> */}
      </div>
    </div>
  );
}
