import { AlertDialog, ContextMenu } from "@radix-ui/themes";
import React, { useState } from "react";
import { LuFileCog, LuFolderCog } from "react-icons/lu";
import {
  __dirname,
  electron,
  ipcRenderer,
} from "../../../../constant/contextBridge";
import RenamePakMod from "./RenamePakMod/RenamePakMod";
import LOCALES from "../../../../locales";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";

type Props = {
  name: string;
  rename: string;
  isDirectory: boolean;
};

export default function PakModItem(props: Props) {
  const { appLanguage } = useAppLanguage();

  const handleViewSourceCode = () => {
    electron.openExplorer(
      `/engine/steamapps/common/PalServer/Pal/Content/Paks/${props.name}`
    );
  };

  const handleDeleteMod = () => {
    ipcRenderer.send("request-delete-pak-mods", props.name);
  };

  return (
    <AlertDialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            className={
              "flex flex-col gap-y-2 items-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1 relative"
            }
          >
            {props.isDirectory ? (
              <LuFolderCog
                size={32}
                className="absolute top-4"
                color={"white"}
              />
            ) : (
              <LuFileCog size={32} className="absolute top-4" />
            )}
            <span className="absolute top-14 text-xs text-center w-24 break-words">
              {props.rename}
            </span>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Group>
            {props.isDirectory && (
              <ContextMenu.Item onClick={handleViewSourceCode}>
                {LOCALES[appLanguage].OpenFilePath}
              </ContextMenu.Item>
            )}
            <AlertDialog.Trigger>
              <ContextMenu.Item>{LOCALES[appLanguage].Rename}</ContextMenu.Item>
            </AlertDialog.Trigger>
          </ContextMenu.Group>
          <ContextMenu.Separator />
          <ContextMenu.Item shortcut="⌫" color="red" onClick={handleDeleteMod}>
            {LOCALES[appLanguage].DeleteMod}
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <RenamePakMod name={props.name} rename={props.rename} />
    </AlertDialog.Root>
  );
}

const LogicModsPakModItem = (props: { rename: string }) => {
  return (
    <div
      className={
        "flex flex-col gap-y-2 items-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1 relative"
      }
    >
      <LuFolderCog size={32} className="absolute top-4" color={"gold"} />
      <span
        className="absolute top-14 text-xs text-center w-24 break-words"
        style={{ color: "gold" }}
      >
        {props.rename}
      </span>
    </div>
  );
};
