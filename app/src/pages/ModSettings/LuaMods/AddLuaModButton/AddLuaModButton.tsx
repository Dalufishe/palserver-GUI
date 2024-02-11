import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { electron } from "../../../../constant/contextBridge";
import LOCALES from "../../../../locales";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import formatLocale from "../../../../utils/formatLocale";

export default function AddLuaModButton({
  button,
}: {
  button: React.ReactNode;
}) {
  const { appLanguage } = useAppLanguage();

  const handleOpenModFolder = () => {
    electron.openExplorer(
      `/engine/steamapps/common/PalServer/Pal/Binaries/Win64/Mods`
    );
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {formatLocale(LOCALES[appLanguage].HowToImportMods, ["Lua"])}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].HowToImportLuaModsDesc1}</div>
            <div>{LOCALES[appLanguage].HowToImportLuaModsDesc2}</div>
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
