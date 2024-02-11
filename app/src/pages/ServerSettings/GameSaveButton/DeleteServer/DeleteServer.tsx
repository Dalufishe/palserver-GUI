import {
  AlertDialog,
  Button,
  ContextMenu,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import useGameSave from "../../../../hooks/useGameSave";
import useSaveMeta from "../../../../hooks/useSaveMeta";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";

export default function DeleteServer(props: { saveId: string }) {
  const { appLanguage } = useAppLanguage();

  const gameSave = useGameSave(props.saveId);
  const gameSaveServerName = gameSave?.settings?.ServerName?.slice(1, -1);

  const [inputServerName, setInputServerName] = useState("");

  // 存檔 meta data
  const { metaData, setMetaData } = useSaveMeta();

  const handleDeleteSave = () => {
    setMetaData(metaData.filter((s: any) => s?.id !== props.saveId));
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{LOCALES[appLanguage].DeleteServer}</AlertDialog.Title>
      <AlertDialog.Description size="2">
        {LOCALES[appLanguage].DeleteServerDesc}
      </AlertDialog.Description>

      <div className="my-2">
        <TextFieldInput
          value={inputServerName}
          onChange={(e) => {
            setInputServerName(e.target.value);
          }}
          placeholder={LOCALES[appLanguage].PleaseEnterServerName}
        />
      </div>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {LOCALES[appLanguage].Cancel}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button
            disabled={inputServerName !== gameSaveServerName}
            onClick={handleDeleteSave}
            variant="solid"
            color="red"
          >
            {LOCALES[appLanguage].VerifyDelete}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
