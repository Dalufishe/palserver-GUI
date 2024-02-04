import React from "react";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useGameSave from "../../../../hooks/useGameSave";
import CuteImg from "../../../../assets/images/start.webp";
import { Badge, Blockquote, Tooltip } from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";
import { Link } from "react-router-dom";
import useServerIsRunning from "../../../../hooks/useServerIsRunning";
import { engine } from "../../../../constant/contextBridge";

export default function GameSavePreview() {
  const isServerRunning = useServerIsRunning();

  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);

  const handleCopyToClickboard = (v: string) => {
    navigator.clipboard.writeText(v);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Link to="server-settings">
        <img src={CuteImg} alt="" className="w-32 h-32" />
      </Link>
      {/* 伺服器名稱 */}
      <span className="cursor-default text-[120%]">
        {currentSave?.settings?.ServerName?.slice(1, -1)}
      </span>
      <div className="w-full text-[90%] flex flex-col items-center">
        {/* 伺服器地址 */}
        <div className="w-[70%] flex justify-between items-center flex-wrap">
          <span>伺服器 IP：</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleCopyToClickboard(
                currentSave?.settings?.PublicIP?.slice(1, -1)
              );
            }}
          >
            {currentSave?.settings?.PublicIP?.slice(1, -1) || "尚未設置"}
          </span>
        </div>
        <Tooltip
          delayDuration={1000}
          content="這是你自己玩輸入的 IP 地址"
          style={{ background: "#1b1421", color: "white" }}
        >
          <div className="w-[70%] flex justify-between items-center flex-wrap">
            <span>本機 IP：</span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleCopyToClickboard("127.0.0.1:8211");
              }}
            >
              {"127.0.0.1:8211"}
            </span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
