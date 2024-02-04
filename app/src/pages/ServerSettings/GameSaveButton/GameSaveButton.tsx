import { useState } from "react";
import CuteImg from "../../../assets/images/start.webp";
import useGameSave from "../../../hooks/useGameSave";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import { cn } from "../../../utils/cn";
import { AlertDialog, ContextMenu } from "@radix-ui/themes";
import DeleteServer from "./DeleteServer/DeleteServer";
import EditServerSettings from "./EditServerSettings/EditServerSettings";

type Props = {
  saveMetaData: { id: string };
};

export default function SaveButton(props: Props) {
  const { setSelectedGameSave } = useSelectedGameSave();

  const gameSaveId = props.saveMetaData.id;
  const gameSave = useGameSave(gameSaveId);

  const handleSelect = () => {
    setSelectedGameSave(props.saveMetaData?.id);
  };

  const [currentAlert, setCurrentAlret] = useState("");

  return (
    <AlertDialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            onClick={handleSelect}
            className={cn(
              "flex flex-col gap-1 items-center w-28 h-24 p-1 cursor-pointer rounded-lg hover:bg-bg1"
            )}
          >
            <img src={CuteImg} alt="" className="w-12 h-12" />
            <span className="text-xs text-center">
              {gameSave?.settings?.ServerName.slice(1, -1)}
            </span>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <AlertDialog.Trigger
            onClick={() => {
              setCurrentAlret("edit-server");
            }}
          >
            <ContextMenu.Item>編輯伺服器</ContextMenu.Item>
          </AlertDialog.Trigger>
          <ContextMenu.Separator />
          <AlertDialog.Trigger
            onClick={() => {
              setCurrentAlret("delete-server");
            }}
          >
            <ContextMenu.Item shortcut="⌫" color="red">
              刪除伺服器
            </ContextMenu.Item>
          </AlertDialog.Trigger>
        </ContextMenu.Content>
      </ContextMenu.Root>

      {currentAlert === "edit-server" && (
        <EditServerSettings saveId={props.saveMetaData.id} />
      )}
      {currentAlert === "delete-server" && (
        <DeleteServer saveId={props.saveMetaData.id} />
      )}
    </AlertDialog.Root>
  );
}
