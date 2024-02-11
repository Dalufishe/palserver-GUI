import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { electron } from "../../../../constant/contextBridge";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import formatLocale from "../../../../utils/formatLocale";
import LOCALES from "../../../../locales";

export default function AddPakModButton({
  button,
}: {
  button: React.ReactNode;
}) {
  const { appLanguage } = useAppLanguage();

  const handleOpenModFolder = () => {
    electron.openExplorer(
      `/engine/steamapps/common/PalServer/Pal/Content/Paks`
    );
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {formatLocale(LOCALES[appLanguage].HowToImportMods, ["Pak"])}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].HowToImportPakModsDesc1}</div>
            <div> {LOCALES[appLanguage].HowToImportPakModsDesc2}</div>
          </div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={handleOpenModFolder}
              variant="solid"
              color="yellow"
            >
              {LOCALES[appLanguage].OpenModsFolder}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
