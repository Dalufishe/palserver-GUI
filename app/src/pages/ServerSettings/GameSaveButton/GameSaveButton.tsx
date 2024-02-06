import { useState } from "react";
import CuteImg from "../../../assets/images/start.webp";
import useGameSave from "../../../hooks/useGameSave";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import { cn } from "../../../utils/cn";
import { AlertDialog, ContextMenu } from "@radix-ui/themes";
import DeleteServer from "./DeleteServer/DeleteServer";
import EditServerSettings from "./EditServerSettings/EditServerSettings";
import PalIcons from "../../../constant/palIcons";
import useSaveMeta from "../../../hooks/useSaveMeta";

type Props = {
  saveMetaData: { id: string };
};

export default function SaveButton(props: Props) {
  const { selectedGameSave, setSelectedGameSave } = useSelectedGameSave();

  const { getSaveMetaData } = useSaveMeta();

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
            className={
              "flex flex-col gap-y-2 items-center justify-center w-28 h-24 p-2 cursor-pointer rounded-lg hover:bg-bg1"
            }
          >
            <img
              src={PalIcons[getSaveMetaData(gameSaveId)?.iconId] || CuteImg}
              alt=""
              className="w-12 h-12 select-none"
            />
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
