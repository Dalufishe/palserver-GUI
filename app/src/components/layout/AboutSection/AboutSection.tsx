import { FaGithub } from "react-icons/fa";
import IconImage from "../../../assets/images/icon.webp";
import Button from "../../global/Button";

export default function AboutSection() {
  const handleOpenGithub = () => {
    // window.location = ""
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
