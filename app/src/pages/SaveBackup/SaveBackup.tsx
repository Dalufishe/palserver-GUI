import {
  AlertDialog,
  Button,
  Flex,
  Link,
  Select,
  TextFieldInput,
} from "@radix-ui/themes";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";
import { useEffect, useState } from "react";
import { electron, ipcRenderer } from "../../constant/contextBridge";
import useSelectedGameSave from "../../redux/selectGameSave/useSelectedGameSave";
import SetBackupTime from "./SetBackupTime/SetBackupTime";

export default function SaveBackup() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();

  const [saveBackup, setSaveBackup] = useState<any>([]);

  useEffect(() => {
    ipcRenderer.send("request-save-backup", selectedGameSave);

    const listener = (event, save) => {
      setSaveBackup(save);
    };

    ipcRenderer.on(`save-backup-response-${selectedGameSave}`, listener);
  }, [selectedGameSave]);

  useEffect(() => {
    return () => {
      ipcRenderer.removeAllListeners(
        `save-backup-response-${selectedGameSave}`
      );
    };
  }, []);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray">{LOCALES[appLanguage].ServerBackupRecord}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].ServerBackupRecord}
        </AlertDialog.Title>
        <AlertDialog.Description>
          {saveBackup
            ?.sort((a: any, b: any) => b - a)
            ?.slice(0, 20)
            ?.map((backupId: string) => (
              <BackupItem backupId={backupId} />
            ))}
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="between">
          <SetBackupTime />
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

const BackupItem = ({ backupId }: { backupId: string }) => {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();

  const handleOpenPath = () => {
    electron.openExplorer(`./saves-backup/${selectedGameSave}/${backupId}`);
  };

  return (
    <div className="flex items-center justify-between h-8">
      <span>{new Date(Number(backupId)).toLocaleString()}</span>
      <Button color="yellow" size={"1"} onClick={handleOpenPath}>
        {LOCALES[appLanguage].Open}
      </Button>
    </div>
  );
};
