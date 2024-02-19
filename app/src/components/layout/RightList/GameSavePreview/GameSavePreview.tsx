import React, { useState } from "react";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";
import useGameSave from "../../../../hooks/useGameSave";
import CuteImg from "../../../../assets/images/start.webp";
import { Tooltip } from "@radix-ui/themes";
import { useHistory } from "react-router-dom";
import useSaveMeta from "../../../../hooks/useSaveMeta";
import PalIcons from "../../../../constant/palIcons";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import LOCALES from "../../../../locales";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";

export default function GameSavePreview() {
  const { appLanguage } = useAppLanguage();
  const history = useHistory();

  const { selectedGameSave } = useSelectedGameSave();
  const currentSave = useGameSave(selectedGameSave);
  const { getSaveMetaData } = useSaveMeta();

  const handleCopyToClickboard = (v: string) => {
    navigator.clipboard.writeText(v);
  };

  const [isShowIP, setIsShowIP] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="cursor-pointer"
        onClick={() => {
          history.push("/");
        }}
      >
        <img
          src={PalIcons[getSaveMetaData(selectedGameSave)?.iconId] || CuteImg}
          alt=""
          className="w-32 h-32 select-none"
        />
      </div>
      {/* 伺服器名稱 */}
      <span className="cursor-default text-[120%]">
        {currentSave?.settings?.ServerName?.slice(1, -1)}
      </span>
      <div className="w-full text-[90%] flex flex-col items-center">
        {/* 伺服器 IP */}
        <Tooltip
          content={LOCALES[appLanguage].OthersEnterIP}
          style={{ background: "#1b1421", color: "white" }}
        >
          <div className="w-[70%] flex justify-between items-center flex-wrap text-xs relative">
            <span>{LOCALES[appLanguage].PublicIP}：</span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleCopyToClickboard(
                  currentSave?.settings?.PublicIP?.slice(1, -1)
                );
              }}
            >
              {currentSave?.settings?.PublicIP?.slice(1, -1)
                ? isShowIP
                  ? // 顯示完整
                    `${currentSave?.settings?.PublicIP?.slice(1, -1)}:${
                      currentSave?.settings?.PublicPort
                    }`
                  : // 隱藏文字
                    "*".repeat(
                      `${currentSave?.settings?.PublicIP?.slice(1, -1)}:${
                        currentSave?.settings?.PublicPort
                      }`?.length
                    )
                : LOCALES[appLanguage].HaventSavedYet}
            </span>
            <div
              className="absolute -right-5 cursor-pointer"
              onClick={() => {
                setIsShowIP(!isShowIP);
              }}
            >
              {isShowIP ? <PiEyeBold /> : <PiEyeClosedBold />}
            </div>
          </div>
        </Tooltip>
        {/* 本機 IP */}
        <Tooltip
          content={LOCALES[appLanguage].YourselfEnterIP}
          style={{ background: "#1b1421", color: "white" }}
        >
          <div className="w-[70%] flex justify-between items-center flex-wrap text-xs">
            <span>{LOCALES[appLanguage].LocalIP}：</span>
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
            <span>{LOCALES[appLanguage].PublicPort}：</span>
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
              <span>{LOCALES[appLanguage].RCONPort}：</span>
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
