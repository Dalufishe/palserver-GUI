import React, { useEffect, useState } from "react";
import { ipcRenderer } from "../../../../constant/contextBridge";
import { cn } from "../../../../pages/utils/cn";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../../hooks/useServerIsRunning";
import { useHistory } from "react-router-dom";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../../locales";
import useRconOptions from "../../../../hooks/useRconOptions";
import { useHover } from "../../../../hooks/useHover";
import { AlertDialog, Button, Flex, TextFieldInput } from "@radix-ui/themes";
import useGameSave from "../../../../hooks/useGameSave";

export default function BootServerBtn() {
  const { appLanguage } = useAppLanguage();
  const history = useHistory();

  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);
  const isRCONEnabled = currentSave?.settings?.RCONEnabled;

  const isServerRunning = useServerIsRunning();
  const rconOptions = useRconOptions();

  // 啟動伺服器
  const handleBootServer = () => {
    history.push("/save-settings");

    // 將上一個存檔保存
    ipcRenderer.send("request-set-engine-to-save");
    ipcRenderer.on("set-engine-to-save-response:done", () => {
      // 將指定存檔存入引擎
      ipcRenderer.send("request-set-save-to-engine", selectedGameSave);
      ipcRenderer.on("set-save-to-engine-response:done", (event, data) => {
        // 啟動伺服器
        ipcRenderer.send("request-exec-server");
        ipcRenderer.removeAllListeners("set-save-to-engine-response:done");
      });
      ipcRenderer.removeAllListeners("set-engine-to-save-response:done");
    });
  };

  //關閉伺服器

  const [shutdownDelay, setShutdownDelay] = useState("1");
  const [shutdownBoardCast, setShutdownBoardCast] = useState("");

  const handleCloseServer = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `Shutdown ${shutdownDelay} ${shutdownBoardCast}`
    );
  };

  // 關閉小黑窗
  useEffect(() => {
    // const i = setInterval(() => {
    //   // 每分鐘自動存檔
    //   ipcRenderer.send("request-set-engine-to-save");
    // }, 60 * 1000);

    // 伺服器關閉保存存檔
    ipcRenderer.on("exec-server-response:exit", (event) => {
      ipcRenderer.send("request-set-engine-to-save");
    });

    return () => {
      ipcRenderer.removeAllListeners("exec-server-response:exit");
      // clearInterval(i);
    };
  }, []);

  return isServerRunning ? (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <div
          className={cn(
            "w-full h-10 bg-gray-200 text-bg1 rounded-lg flex items-center justify-center select-none",
            "cursor-pointer"
          )}
        >
          {LOCALES[appLanguage].CloseServer}
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>
          {LOCALES[appLanguage].CloseServer}
        </AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex gap-3">
            {isRCONEnabled ? (
              <>
                <TextFieldInput
                  style={{ width: 338 }}
                  value={shutdownBoardCast}
                  onChange={(e) => {
                    setShutdownBoardCast(e.target.value);
                  }}
                />
                <TextFieldInput
                  style={{ width: 52 }}
                  value={shutdownDelay}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setShutdownDelay(e.target.value);
                    } else if (Number(e.target.value) < 1) {
                      setShutdownDelay("1");
                    } else {
                      setShutdownDelay(e.target.value);
                    }
                  }}
                  type="number"
                />
              </>
            ) : (
              LOCALES[appLanguage].RCONFirst
            )}
          </div>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            {isRCONEnabled && (
              <Button onClick={handleCloseServer} variant="solid" color="red">
                {LOCALES[appLanguage].CloseServer}
              </Button>
            )}
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ) : (
    <div
      onClick={handleBootServer}
      className={cn(
        "w-full h-10 bg-gray-200 text-bg1 rounded-lg flex items-center justify-center select-none",
        "cursor-pointer"
      )}
    >
      {LOCALES[appLanguage].BootServer}
    </div>
  );
}
