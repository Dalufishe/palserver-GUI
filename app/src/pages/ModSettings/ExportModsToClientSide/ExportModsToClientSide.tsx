import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { electron, ipcRenderer } from "../../../constant/contextBridge";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../locales";

export default function ExportModsToClientSide() {
  const { appLanguage } = useAppLanguage();

  const handleExportClientMods = () => {
    ipcRenderer.send("request-export-clientside-mods");
    ipcRenderer.on("export-clientside-mods-response:done", () => {
      electron.openExplorer("/.clientside-mods");
      ipcRenderer.removeAllListeners("export-clientside-mods-response:done");
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>{LOCALES[appLanguage].ExportModsToClientSide}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].ExportModsToClientSide}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].ExportModsToClientSideDesc1}</div>
            <div>{LOCALES[appLanguage].ExportModsToClientSideDesc2}</div>
            <div>
              <img
                src={require("../../../assets/images/HowToImportClientSideMod.png")}
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
              onClick={handleExportClientMods}
              variant="solid"
              color="yellow"
            >
              {LOCALES[appLanguage].Export}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
