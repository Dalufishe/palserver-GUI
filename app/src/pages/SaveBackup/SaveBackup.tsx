import { AlertDialog, Button, Flex, Link } from "@radix-ui/themes";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";

export default function SaveBackup() {
  const { appLanguage } = useAppLanguage();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray">{LOCALES[appLanguage].ServerBackupRecord}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
        {LOCALES[appLanguage].ServerBackupRecord}
        </AlertDialog.Title>
        <AlertDialog.Description></AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
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
