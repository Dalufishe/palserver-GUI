import Button from "../../global/Button";
import { useHistory } from "react-router-dom";
import { engine, ipcRenderer, run } from "../../../constant/contextBridge";
import BootServerBtn from "./BootServerBtn/BootServerBtn";
import GameSavePreview from "./GameSavePreview/GameSavePreview";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../hooks/useServerIsRunning";
import { Badge } from "@radix-ui/themes";
import { cn } from "../../../pages/utils/cn";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../locales";

export default function RightList() {
  const { appLanguage } = useAppLanguage();
  const history = useHistory();

  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();

  return (
    <div className="w-[400px] h-full p-4 bg-bg2 flex flex-col gap-4 relative">
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
          className={isServerRunning ? "cursor-not-allowed" : " cursor-pointer"}
          onClick={
            isServerRunning
              ? () => {}
              : () => {
                  history.push("/save-settings");
                }
          }
        >
          {LOCALES[appLanguage].ServerSettings}
        </ListButton>
        <ListButton
          className={isServerRunning ? "cursor-not-allowed" : " cursor-pointer"}
          onClick={
            isServerRunning
              ? () => {}
              : () => {
                  history.push("/world-settings");
                }
          }
        >
          {LOCALES[appLanguage].WorldSettings}
        </ListButton>
        <ListButton
          className={isServerRunning ? "cursor-not-allowed" : " cursor-pointer"}
          onClick={
            isServerRunning
              ? () => {}
              : () => {
                  history.push("/mod-settings");
                }
          }
        >
          {LOCALES[appLanguage].ModsTool}
        </ListButton>
        <BootServerBtn disabled={isServerRunning} />
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
