import {
  AlertDialog,
  Button,
  ContextMenu,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import useGameSave from "../../../../hooks/useGameSave";
import { ipcRenderer } from "../../../../constant/contextBridge";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";

export default function EditServerSettings(props: { saveId: string }) {
  const { appLanguage } = useAppLanguage();

  const { setSelectedGameSave } = useSelectedGameSave();

  const gameSave = useGameSave(props.saveId);
  const gameSaveServerName = gameSave?.settings?.ServerName?.slice(1, -1);
  const gameSavePublicIP = gameSave?.settings?.PublicIP?.slice(1, -1);
  const gameSavePublicPort = gameSave?.settings?.PublicPort;
  const gameSaveServerPassword = gameSave?.settings?.ServerPassword?.slice(
    1,
    -1
  );
  const gameSaveAdminPassword = gameSave?.settings?.AdminPassword?.slice(1, -1);

  const [serverName, setServerName] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [publicPort, setPublicPort] = useState("");

  const [serverPassword, setServerPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleEditGameSave = () => {
    ipcRenderer.send(
      "request-set-save",
      props.saveId,
      {
        settings: {
          ServerName: `"${serverName ? serverName : gameSaveServerName}"`,
          PublicIP: `"${publicIP ? publicIP : gameSavePublicIP}"`,
          PublicPort: publicPort ? Number(publicPort) : gameSavePublicPort,
          ServerPassword: `"${
            serverPassword ? serverPassword : gameSaveServerPassword
          }"`,
          AdminPassword: `"${
            adminPassword ? adminPassword : gameSaveAdminPassword
          }"`,
        },
      },
      "a"
    );
    setServerName("");
    setPublicIP("");
    setPublicPort(null);
    setServerPassword("");
    setAdminPassword("");
    setSelectedGameSave(props.saveId);
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{LOCALES[appLanguage].EditServer}</AlertDialog.Title>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>{LOCALES[appLanguage].ServerName}：</span>
        <TextFieldInput
          placeholder={gameSaveServerName}
          value={serverName}
          onChange={(e) => {
            setServerName(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>{LOCALES[appLanguage].PublicIP}：</span>
        <TextFieldInput
          placeholder={gameSavePublicIP}
          value={publicIP}
          onChange={(e) => {
            setPublicIP(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>{LOCALES[appLanguage].PublicPort}：</span>
        <TextFieldInput
          placeholder={gameSavePublicPort}
          type="number"
          value={publicPort}
          onChange={(e) => {
            setPublicPort(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>{LOCALES[appLanguage].ServerPassword}：</span>
        <TextFieldInput
          placeholder={gameSaveServerPassword}
          value={serverPassword}
          onChange={(e) => {
            setServerPassword(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>{LOCALES[appLanguage].AdminPassword}：</span>
        <TextFieldInput
          placeholder={gameSaveAdminPassword}
          value={adminPassword}
          onChange={(e) => {
            setAdminPassword(e.target.value);
          }}
        />
      </div>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {LOCALES[appLanguage].Cancel}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" onClick={handleEditGameSave}>
            {LOCALES[appLanguage].VerifyChange}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
