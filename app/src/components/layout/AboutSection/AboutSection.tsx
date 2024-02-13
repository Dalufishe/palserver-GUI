import { FaDiscord, FaGithub, FaHeart } from "react-icons/fa";
import IconImage from "../../../assets/images/icon.webp";
import Button from "../../global/Button";
import { electron } from "../../../constant/contextBridge";
import { Select, Tooltip } from "@radix-ui/themes";
import { Link, useHistory } from "react-router-dom";
import APP from "../../../constant/app";
import useAppLanguage from "../../../redux/appLanguage/useAppLanguage";
import SupportMe from "./SupportMe/SupportMe";

export default function AboutSection() {
  const { appLanguage, setAppLanguage } = useAppLanguage();
  const history = useHistory();

  const handleOpenGithub = () => {
    electron.openLink("https://github.com/Dalufishe/palserver-GUI");
  };

  const handleOpenDiscord = () => {
    electron.openLink("https://discord.gg/sgMMdUZd3V");
  };

  return (
    <div className="flex gap-2 p-2 bg-bg2 rounded-lg items-center relative">
      <div
        onClick={() => {
          history.push("/");
        }}
        className="flex gap-2 cursor-pointer"
      >
        <img src={IconImage} alt="icon" className="w-6 h-6" />
        <span>{APP.APP_NAME}</span>
      </div>
      <div className="absolute right-2 flex gap-2 items-center">
        {/* 切換語言 */}
        <Select.Root
          size="1"
          value={appLanguage}
          onValueChange={(v) => {
            setAppLanguage(v);
          }}
        >
          <Select.Trigger style={{ background: "#1b1421", color: "white" }} />
          <Select.Content style={{ background: "#1b1421", color: "white" }}>
            <Select.Item value="zh_tw">繁體中文</Select.Item>
            <Select.Item value="zh_cn">简体中文</Select.Item>
            <Select.Item value="en">English</Select.Item>
          </Select.Content>
        </Select.Root>
        <SupportMe />
        <Button onClick={handleOpenGithub}>
          <FaGithub />
        </Button>
        <Button onClick={handleOpenDiscord}>
          <FaDiscord />
        </Button>
      </div>
    </div>
  );
}
