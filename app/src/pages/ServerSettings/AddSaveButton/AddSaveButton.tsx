import {
  AlertDialog,
  Blockquote,
  Button,
  Flex,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { ipcRenderer } from "../../../constant/contextBridge";
import { nanoid } from "nanoid";
import useSaveMeta from "../../../hooks/useSaveMeta";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";

export default function AddSaveButton() {
  const saveMetaJson = useSaveMeta();
  const { setSelectedGameSave } = useSelectedGameSave();

  const [serverName, setServerName] = useState("");

  const handleAddGameSave = () => {
    const saveId = nanoid();
    ipcRenderer.send("request-set-save", saveId, {
      settings: { ServerName: `"${serverName}"` },
    });
    ipcRenderer.send("request-set-save-metadata", [
      ...saveMetaJson,
      { id: saveId },
    ]);
    setServerName("");
    setSelectedGameSave(saveId);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AddButton />
      </AlertDialog.Trigger>
      <form>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>建立存檔</AlertDialog.Title>
          <AlertDialog.Description
            size="2"
            className="flex flex-col gap-2 w-[70%]"
          >
            <div className="flex gap-2 items-center justify-between">
              <div>伺服器名稱：</div>
              <TextField.Root>
                <TextField.Input
                  required
                  autoFocus
                  placeholder=""
                  value={serverName}
                  onChange={(e) => {
                    setServerName(e.target.value);
                  }}
                />
              </TextField.Root>
            </div>
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                取消
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                disabled={!serverName}
                onClick={handleAddGameSave}
                variant="solid"
                color="yellow"
              >
                建立
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </form>
    </AlertDialog.Root>
  );
}

const AddButton = (props: { onClick?: () => void }) => (
  <div
    onClick={props.onClick}
    className={
      "flex flex-col gap-1 w-28 h-24 p-1 cursor-pointer rounded-lg items-center justify-center hover:scale-110 transition-[transform]"
    }
  >
    <MdAddCircle size={32} />
  </div>
);
