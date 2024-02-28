import Button from "../../global/Button";
import { useHistory } from "react-router-dom";
import { engine } from "../../../constant/contextBridge";
import BootServerBtn from "./BootServerBtn/BootServerBtn";
import GameSavePreview from "./GameSavePreview/GameSavePreview";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import useServerIsRunning from "../../../hooks/useServerIsRunning";
import { Badge } from "@radix-ui/themes";
import { cn } from "../../../utils/cn";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import LOCALES from "../../../locales";
import { isUndefined } from "lodash";
import useSaveMeta from "../../../hooks/useSaveMeta";

export default function RightList() {
  const { appLanguage } = useAppLanguage();
  const history = useHistory();

  const isServerRunning = useServerIsRunning();
  const { selectedGameSave } = useSelectedGameSave();

  // ue4ss
  const { getSaveMetaData } = useSaveMeta();
  const saveMetaData = getSaveMetaData(selectedGameSave);
  const isUe4ssEnabled = isUndefined(saveMetaData?.ue4ssEnabled)
    ? true
    : saveMetaData?.ue4ssEnabled;

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
          className="cursor-pointer"
          onClick={() => {
            history.push("/save-settings");
          }}
        >
          {LOCALES[appLanguage].ServerSettings}
        </ListButton>
        <ListButton
          className={"cursor-pointer"}
          onClick={() => {
            history.push("/world-settings");
          }}
        >
          {LOCALES[appLanguage].WorldSettings}
        </ListButton>
        {isUe4ssEnabled && (
          <ListButton
            className={"cursor-pointer"}
            onClick={() => {
              history.push("/mod-settings");
            }}
          >
            {LOCALES[appLanguage].ModsTool}
          </ListButton>
        )}
        <BootServerBtn />
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
