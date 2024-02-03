import React, { useEffect, useState } from "react";
import Button from "../../global/Button";
import { Link } from "react-router-dom";
import {
  electron,
  engine,
  ipcRenderer,
  run,
} from "../../../constant/contextBridge";
import BootServerBtn from "./BootServerBtn/BootServerBtn";
import GameSavePreview from "./GameSavePreview/GameSavePreview";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../hooks/useServerIsRunning";
import { Badge } from "@radix-ui/themes";

export default function RightList() {
  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();

  return (
    <div className="flex-[3] h-full p-4 bg-bg2 flex flex-col gap-4 relative">
      <GameSavePreview />
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4">
        <div className="self-end">
          {isServerRunning && engine.currentSave() === selectedGameSave ? (
            <Badge color="green" size="2">
              Online
            </Badge>
          ) : (
            <Badge color="red" size="2">
              Offline
            </Badge>
          )}
        </div>
        <Link to="world-settings">
          <ListButton>更改世界設定</ListButton>
        </Link>
        <Link to="save-settings">
          <ListButton>地圖檔設定</ListButton>
        </Link>
        <BootServerBtn />
      </div>
    </div>
  );
}

export const ListButton = ({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) => (
  <Button
    onClick={onClick}
    className="bg-bg1 w-full h-10 rounded-lg flex items-center justify-center"
  >
    {children}
  </Button>
);
