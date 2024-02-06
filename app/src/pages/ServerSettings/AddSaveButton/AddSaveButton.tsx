import {
  AlertDialog,
  Blockquote,
  Button,
  Flex,
  IconButton,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { ipcRenderer } from "../../../constant/contextBridge";
import { nanoid } from "nanoid";
import useSaveMeta from "../../../hooks/useSaveMeta";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import PalIcons from "../../../constant/palIcons";
import { map } from "lodash";
import SelectIconButton from "./SelectIconButton/SelectIconButton";

export default function AddSaveButton() {
  const { metaData, setMetaData } = useSaveMeta();
  const { setSelectedGameSave } = useSelectedGameSave();

  const [serverName, setServerName] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [iconId, setIconId] = useState(0);

  const handleAddGameSave = () => {
    const saveId = nanoid();
    ipcRenderer.send("request-set-save", saveId, {
      settings: { ServerName: `"${serverName}"`, PublicIP: `"${publicIP}"` },
    });
    setMetaData([...metaData, { id: saveId, iconId: iconId }]);
    setServerName("");
    setPublicIP("");
    setSelectedGameSave(saveId);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AddButton />
      </AlertDialog.Trigger>

      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>建立伺服器</AlertDialog.Title>

        <div className="flex">
          <div className="w-[70%]">
            <div className="w-full my-2 flex gap-2 items-center justify-between">
              <span>伺服器名稱：</span>
              <TextFieldInput
                autoFocus
                placeholder=""
                value={serverName}
                onChange={(e) => {
                  setServerName(e.target.value);
                }}
              />
            </div>

            <div className="w-full my-2 flex gap-2 items-center justify-between">
              <span>公開 IP：</span>
              <TextFieldInput
                placeholder=""
                value={publicIP}
                onChange={(e) => {
                  setPublicIP(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-[30%] flex flex-col items-center mt-2">
            <SelectIconButton
              onIconChange={(i) => {
                setIconId(i);
              }}
            />
            {/* <div className="flex flex-col gap-4">
              {map(PalIcons, (v, k) => (
                <IconButton
                  radius="large"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#2d263320",
                  }}
                >
                  <img src={v} className="w-10 h-10" />
                </IconButton>
              ))}
            </div> */}
          </div>
        </div>

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
