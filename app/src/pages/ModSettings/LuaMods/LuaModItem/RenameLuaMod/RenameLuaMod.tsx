import { AlertDialog, Button, Flex, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";
import useAppLanguage from "../../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../../locales";
import { ipcRenderer } from "../../../../../constant/contextBridge";

export default function RenameLuaMod({
  name,
  rename,
}: {
  name: string;
  rename: string;
}) {
  const { appLanguage } = useAppLanguage();

  const [renameText, setRenameText] = useState(rename || name);

  const handleRenameMod = () => {
    ipcRenderer.send("request-rename-lua-mods", name, renameText);
  };

  return (
    <>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>{LOCALES[appLanguage].Rename}</AlertDialog.Title>
        <AlertDialog.Description>
          <TextFieldInput
            value={renameText}
            onChange={(e) => {
              setRenameText(e.target.value);
            }}
          />
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="yellow" onClick={handleRenameMod}>
              {LOCALES[appLanguage].Confirm}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </>
  );
}
