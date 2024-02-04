import React, { useEffect, useState } from "react";
import Button from "../../global/Button";
import { Link, useHistory } from "react-router-dom";
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
import { cn } from "../../../utils/cn";

export default function RightList() {
  const history = useHistory();

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

        <ListButton
          className={isServerRunning ? "cursor-not-allowed" : " cursor-pointer"}
          onClick={
            isServerRunning
              ? () => {}
              : () => {
                  history.push("/world-settings");
                }
          }
        >
          更改世界設定
        </ListButton>

        <ListButton
          className={isServerRunning ? "cursor-not-allowed" : " cursor-pointer"}
          onClick={
            isServerRunning
              ? () => {}
              : () => {
                  history.push("/save-settings");
                }
          }
        >
          地圖檔設定
        </ListButton>

        <BootServerBtn />
      </div>
    </div>
  );
}

export const ListButton = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: any;
  onClick?: () => void;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      "bg-bg1 w-full h-10 rounded-lg flex items-center justify-center",
      className
    )}
  >
    {children}
  </Button>
);
