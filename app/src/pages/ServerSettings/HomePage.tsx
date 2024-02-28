import GameSaveBtn from "./GameSaveButton/GameSaveButton";
import AddSaveButton from "./AddSaveButton/AddSaveButton";
import useSaveMeta from "../../hooks/useSaveMeta";
import APP from "../../constant/app";
import AddButton from "../../components/global/AddButton";
import { Button, Link } from "@radix-ui/themes";
import { electron } from "../../constant/contextBridge";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";
import { useHistory } from "react-router-dom";
import versionToValue from "../../utils/versionToValue";
import useLatestVersion from "../../hooks/useLatestVersion";
import useHomePageAds from "../../hooks/Ads/useHomePageAds";
import formatLocale from "../../utils/formatLocale";
import useHomePageSmallAds from "../../hooks/Ads/useHomePageSmallAds";

export default function HomePage() {
  const { metaData } = useSaveMeta();
  const { appLanguage } = useAppLanguage();

  const currentVersion = versionToValue(APP.VERSION);
  const { versionValue, version } = useLatestVersion();

  const { data: homePageAds } = useHomePageAds();
  const { data: homePageSmallAds } = useHomePageSmallAds();

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <div className="flex flex-row items-start gap-3 flex-wrap">
        {metaData?.map((save: any) => (
          <GameSaveBtn key={save.id} saveMetaData={save} />
        ))}
        <AddSaveButton button={<AddButton />} />
      </div>
      <div className="absolute bottom-2 left-2 text-xs flex flex-col w-[98%] gap-2">
        {/* version & support by */}
        <div className="w-full flex justify-between">
          <div>
            {APP.PLATFORM} - {APP.VERSION} ({APP.ENV}){" "}
            {versionValue > currentVersion ? (
              <Link
                color="blue"
                onClick={() => {
                  electron.openLink(
                    "https://github.com/Dalufishe/palserver-GUI/releases"
                  );
                }}
              >
                {formatLocale(LOCALES[appLanguage].NewUpdate, [version])}
              </Link>
            ) : (
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  electron.openLink(
                    "https://github.com/Dalufishe/palserver-GUI/releases/tag/" +
                      APP.VERSION
                  );
                }}
              >
                {LOCALES[appLanguage].UpdateLog}
              </span>
            )}
          </div>
          <Link
            className="text-xs"
            style={{ color: "white" }}
            onClick={() => {
              electron.openLink(homePageSmallAds?.linkUrl);
            }}
            dangerouslySetInnerHTML={{
              __html: formatLocale(LOCALES[appLanguage].SupportBy, ["TOC"]),
            }}
          ></Link>
        </div>
        {/* ads */}
        {homePageAds?.linkUrl && (
          <div
            onClick={() => {
              electron.openLink(homePageAds?.linkUrl);
            }}
            className="w-full h-[72px] flex justify-center bg-bg1 cursor-pointer"
          >
            <img
              className="w-[672px] h-[72px]"
              src={homePageAds?.imageUrl}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
