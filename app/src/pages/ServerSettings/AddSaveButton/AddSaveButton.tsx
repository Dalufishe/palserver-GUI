import {
  AlertDialog,
  Blockquote,
  Button,
  Flex,
  IconButton,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { ipcRenderer } from "../../../constant/contextBridge";
import { nanoid } from "nanoid";
import useSaveMeta from "../../../hooks/useSaveMeta";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import PalIcons from "../../../constant/palIcons";
import { map } from "lodash";
import SelectIconButton from "./SelectIconButton/SelectIconButton";
import useGameSave from "../../../hooks/useGameSave";

export default function AddSaveButton({ button }: { button: React.ReactNode }) {
  const { metaData, setMetaData } = useSaveMeta();
  const { selectedGameSave, setSelectedGameSave } = useSelectedGameSave();

  const gameSave = useGameSave(selectedGameSave);
  const gameSavePublicIP = gameSave?.settings?.PublicIP?.slice(1, -1);
  const gameSavePublicPort = gameSave?.settings?.PublicPort;

  const [serverName, setServerName] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [publicPort, setPublicPort] = useState(gameSavePublicPort);
  useEffect(() => {
    setPublicPort(gameSavePublicPort);
  }, [gameSavePublicPort]);

  const [serverPassword, setServerPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [iconId, setIconId] = useState(0);

  const handleAddGameSave = () => {
    const saveId = nanoid();
    ipcRenderer.send("request-set-save", saveId, {
      settings: {
        ServerName: `"${serverName}"`,
        PublicIP: `"${publicIP ? publicIP : gameSavePublicIP}"`,
        PublicPort: publicPort ? publicPort : gameSavePublicPort,
        ServerPassword: `"${serverPassword}"`,
        AdminPassword: `"${adminPassword}"`,
      },
    });
    setMetaData([...metaData, { id: saveId, iconId: iconId }]);
    setServerName("");
    setPublicIP("");
    setServerPassword("");
    setAdminPassword("");
    setSelectedGameSave(saveId);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>
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

            <div className="w-full my-2 flex gap-2 items-center justify-between">
              <span>端口號：</span>
              <TextFieldInput
                value={publicPort}
                onChange={(e) => {
                  setPublicPort(e.target.value);
                }}
              />
            </div>

            <div className="w-full my-2 flex gap-2 items-center justify-between">
              <span>伺服器密碼：</span>
              <TextFieldInput
                value={serverPassword}
                onChange={(e) => {
                  setServerPassword(e.target.value);
                }}
              />
            </div>

            <div className="w-full my-2 flex gap-2 items-center justify-between">
              <span>管理員密碼：</span>
              <TextFieldInput
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="w-[30%] flex flex-col items-center mt-7">
            <SelectIconButton
              onIconChange={(i) => {
                setIconId(i);
              }}
            />
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
