import Button from "../../global/Button";
import { useHistory } from "react-router-dom";
import { engine, ipcRenderer, run } from "../../../constant/contextBridge";
import BootServerBtn from "./BootServerBtn/BootServerBtn";
import GameSavePreview from "./GameSavePreview/GameSavePreview";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../hooks/useServerIsRunning";
import { Badge } from "@radix-ui/themes";
import { cn } from "../../../utils/cn";
import { Resizable } from "react-resizable";
import { useState } from "react";

export default function RightList() {
  const history = useHistory();

  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();

  const [isServerUpdate, setIsServerUpdate] = useState(false);

  return (
    <div className="w-[360px] h-full p-4 bg-bg2 flex flex-col gap-4 relative">
      <GameSavePreview />
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4">
        <div className="self-end">
          {isServerRunning && engine.currentSave() === selectedGameSave ? (
            <Badge color="green" size="2">
              Online
            </Badge>
          ) : (
            <Badge color="red" size="2">
              Offline
            </Badge>
          )}
        </div>

        <ListButton
          className={
            isServerRunning || isServerUpdate
              ? "cursor-not-allowed"
              : " cursor-pointer"
          }
          onClick={
            isServerRunning || isServerUpdate
              ? () => {}
              : () => {
                  history.push("/world-settings");
                }
          }
        >
          更改世界設定
        </ListButton>

        <ListButton
          className={
            isServerRunning || isServerUpdate
              ? "cursor-not-allowed"
              : " cursor-pointer"
          }
          onClick={
            isServerRunning || isServerUpdate
              ? () => {}
              : () => {
                  history.push("/save-settings");
                }
          }
        >
          開啟存檔位置
        </ListButton>

        <ListButton
          className={
            isServerRunning || isServerUpdate
              ? "cursor-not-allowed"
              : " cursor-pointer"
          }
          onClick={
            isServerRunning || isServerUpdate
              ? () => {}
              : () => {
                  setIsServerUpdate(true);
                  ipcRenderer.send("request-update-server");
                  ipcRenderer.on("update-server-response:done", () => {
                    setIsServerUpdate(false);
                    window.alert("伺服器更新完畢！");
                    ipcRenderer.removeAllListeners(
                      "update-server-response:done"
                    );
                  });
                }
          }
        >
          {isServerUpdate ? "伺服器更新中..." : "更新到最新版"}
        </ListButton>

        <BootServerBtn disabled={isServerRunning || isServerUpdate} />
      </div>
    </div>
  );
}

export const ListButton = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: any;
  onClick?: () => void;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      "bg-bg1 w-full h-10 rounded-lg flex items-center justify-center",
      className
    )}
  >
    {children}
  </Button>
);
