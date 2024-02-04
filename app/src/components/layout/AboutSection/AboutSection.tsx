import { FaGithub } from "react-icons/fa";
import IconImage from "../../../assets/images/icon.webp";
import Button from "../../global/Button";
import { electron } from "../../../constant/contextBridge";

export default function AboutSection() {
  const handleOpenGithub = () => {
    electron.openLink("https://github.com/Dalufishe/palserver-GUI");
  };

  return (
    <div className="flex gap-2 p-2 bg-bg2 rounded-lg items-center relative">
      <img src={IconImage} alt="icon" className="w-6 h-6" />
      <span>palserver GUI</span>
      <div className="absolute right-2">
        <Button onClick={handleOpenGithub}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}
