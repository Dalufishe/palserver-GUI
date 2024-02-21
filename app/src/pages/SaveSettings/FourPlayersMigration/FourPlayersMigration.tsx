import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../locales";
import { electron, engine } from "../../../constant/contextBridge";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";

export default function FourPlayersMigration() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();

  const handleOpenSavePath = () => {
    if (engine.currentSave() === selectedGameSave) {
      electron.openExplorer(
        `./engine/steamapps/common/PalServer/Pal/Saved/SaveGames/0`
      );
    } else {
      // 開啟存檔資料夾
      electron.openExplorer(
        `./saves/${selectedGameSave}/SaveGames/0`
      );
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" style={{ flex: 1 }}>
          {LOCALES[appLanguage].MigrateFourPlayersSave}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 600 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].MigrateFourPlayersSaveToGUI}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc1}</div>
            <div>
              <ul className="list-disc pl-6">
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc2}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc3}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc4}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc5}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc6}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc7}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc8}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc9}</li>
                <li>{LOCALES[appLanguage].MigrateFourPlayersSaveDesc10}</li>
              </ul>
            </div>
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
              onClick={(e) => {
                handleOpenSavePath();
                e.preventDefault();
              }}
              variant="solid"
              color="yellow"
            >
              {LOCALES[appLanguage].OpenSaveFolder}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
