import React from "react";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useGameSave from "../../../../hooks/useGameSave";
import CuteImg from "../../../../assets/images/start.webp";
import { Badge, Blockquote, Tooltip } from "@radix-ui/themes";
import { Link, useHistory } from "react-router-dom";
import useServerIsRunning from "../../../../hooks/useServerIsRunning";
import { engine } from "../../../../constant/contextBridge";
import useSaveMeta from "../../../../hooks/useSaveMeta";
import PalIcons from "../../../../constant/palIcons";
import zh_tw from "../../../../locales/zh_tw";

export default function GameSavePreview() {
  
  const history = useHistory();
  
  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);

  const { getSaveMetaData } = useSaveMeta();

  const handleCopyToClickboard = (v: string) => {
    navigator.clipboard.writeText(v);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div onClick={()=>{history.push("/server-settings");}}>
        <img
          src={PalIcons[getSaveMetaData(selectedGameSave)?.iconId] || CuteImg}
          alt=""
          className="w-32 h-32"
        />
      </div>
      {/* 伺服器名稱 */}
      <span className="cursor-default text-[120%]">
        {currentSave?.settings?.ServerName?.slice(1, -1)}
      </span>
      <div className="w-full text-[90%] flex flex-col items-center">
        {/* 伺服器 IP */}
        <Tooltip
          content="這是你和別人玩輸入的 IP 地址"
          style={{ background: "#1b1421", color: "white" }}
        >
          <div className="w-[70%] flex justify-between items-center flex-wrap text-xs">
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
        </Tooltip>
        {/* 本機 IP */}
        <Tooltip
          content="這是你自己玩輸入的 IP 地址"
          style={{ background: "#1b1421", color: "white" }}
        >
          <div className="w-[70%] flex justify-between items-center flex-wrap text-xs">
            <span>本機 IP：</span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleCopyToClickboard(
                  `127.0.0.1:${currentSave?.settings?.PublicPort}`
                );
              }}
            >
              {`127.0.0.1:${currentSave?.settings?.PublicPort}`}
            </span>
          </div>
        </Tooltip>
        {/* 端口號 */}
        <Tooltip style={{ background: "#1b1421", color: "white" }}>
          <div className="w-[70%] flex justify-between items-center flex-wrap text-xs">
            <span>{zh_tw.PublicPort}：</span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleCopyToClickboard(
                  `127.0.0.1:${currentSave?.settings?.PublicPort}`
                );
              }}
            >
              {currentSave?.settings?.PublicPort}
            </span>
          </div>
        </Tooltip>
        {/* RCON Port */}
        {currentSave?.settings?.RCONEnabled && (
          <Tooltip style={{ background: "#1b1421", color: "white" }}>
            <div className="w-[70%] flex justify-between items-center flex-wrap text-xs">
              <span>{zh_tw.RCONPort}：</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => {
                  handleCopyToClickboard(
                    `127.0.0.1:${currentSave?.settings?.PublicPort}`
                  );
                }}
              >
                {currentSave?.settings?.RCONPort}
              </span>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
