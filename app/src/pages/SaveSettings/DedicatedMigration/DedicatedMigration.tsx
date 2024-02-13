import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import LOCALES from "../../../locales";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import { electron, engine } from "../../../constant/contextBridge";

export default function DedicatedMigration() {
  const { appLanguage } = useAppLanguage();

  const { selectedGameSave } = useSelectedGameSave();

  const handleOpenServerPath = () => {
    if (engine.currentSave() === selectedGameSave) {
      electron.openExplorer(`./engine/steamapps/common/PalServer/Pal/Saved`);
    } else {
      // 開啟存檔資料夾
      electron.openExplorer(`./saves/${selectedGameSave}`);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" style={{ flex: 1 }}>
          {LOCALES[appLanguage].MigrateDedicatedServer}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 600 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].MigrateDedicatedServerToGUI}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].MigrateDedicatedServerDesc1}</div>
            <div>
              <ul className="list-disc pl-6">
                <li>{LOCALES[appLanguage].MigrateDedicatedServerDesc2}</li>
                <li>{LOCALES[appLanguage].MigrateDedicatedServerDesc3}</li>
                <li>{LOCALES[appLanguage].MigrateDedicatedServerDesc4}</li>
                <li>{LOCALES[appLanguage].MigrateDedicatedServerDesc5}</li>
              </ul>
            </div>
            <div>
              <img
                className="select-none"
                src={require("../../../assets/images/HowToMigrateDedicated.png")}
                alt=""
              />
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
                handleOpenServerPath();
                e.preventDefault();
              }}
              variant="solid"
              color="yellow"
            >
              {LOCALES[appLanguage].OpenServerFolder}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
