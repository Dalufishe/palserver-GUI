import GameSaveBtn from "./GameSaveButton/GameSaveButton";
import AddSaveButton from "./AddSaveButton/AddSaveButton";
import useSaveMeta from "../../hooks/useSaveMeta";
import APP from "../../constant/app";
import AddButton from "../../components/global/AddButton";
import { Link } from "@radix-ui/themes";
import { electron, ipcRenderer } from "../../constant/contextBridge";
import { useEffect, useState } from "react";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";

export default function HomePage() {
  const { metaData } = useSaveMeta();
  const { appLanguage } = useAppLanguage();

  const currentVersion = Number(APP.VERSION.split(".").join(""));
  const [latestVersion, setLatestVersion] = useState(0);
  useEffect(() => {
    ipcRenderer.send("request-latest-version");
    ipcRenderer.on("latest-version-response", (event, ver) => {
      setLatestVersion(Number(ver.split(".").join("")));
      ipcRenderer.removeAllListeners("latest-version-response");
    });
  }, []);

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <div className="flex flex-row items-start gap-3 flex-wrap">
        {metaData?.map((save: any) => (
          <GameSaveBtn key={save.id} saveMetaData={save} />
        ))}
        <AddSaveButton button={<AddButton />} />
      </div>
      <div className="absolute bottom-2 left-2 text-xs flex items-center gap-2">
        {APP.PLATFORM} - {APP.VERSION} ({APP.ENV}){" "}
        {latestVersion > currentVersion && (
          <Link
            color="blue"
            onClick={() => {
              electron.openLink(
                "https://github.com/Dalufishe/palserver-GUI/releases"
              );
            }}
          >
            {LOCALES[appLanguage].NewUpdate}
          </Link>
        )}
      </div>
    </div>
  );
}
