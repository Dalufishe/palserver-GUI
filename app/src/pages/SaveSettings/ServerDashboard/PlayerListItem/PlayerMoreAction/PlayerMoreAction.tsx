import {
  AlertDialog,
  Blockquote,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import LOCALES from "../../../../../locales";
import useAppLanguage from "../../../../../redux/appLanguage/useAppLanguage";
import { MdOutlineMoreVert } from "react-icons/md";
import GiveItemToPlayer from "./GiveItemToPlayer/GiveItemToPlayer";
import GivePalToPlayer from "./GivePalToPlayer/GivePalToPlayer";
import useRconOptions from "../../../../../hooks/useRconOptions";
import { ipcRenderer } from "../../../../../constant/contextBridge";
import GiveExpToPlayer from "./GiveExpToPlayer/GiveExpToPlayer";

export default function PlayerMoreAction({ playeruid }: { playeruid: string }) {
  const { appLanguage } = useAppLanguage();

  const [actionType, setActionType] = useState<
    "list" | "give_items" | "give_pals" | "give_exps"
  >("list");

  return (
    <AlertDialog.Root
      onOpenChange={() => {
        setActionType("list");
      }}
    >
      <AlertDialog.Trigger>
        <IconButton size={"1"} color="gray">
          <MdOutlineMoreVert />
        </IconButton>
      </AlertDialog.Trigger>
      {actionType === "list" && (
        <ActionList
          actionType={actionType}
          setActionType={setActionType}
          playeruid={playeruid}
        />
      )}
      {actionType === "give_items" && (
        <GiveItemToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playeruid={playeruid}
        />
      )}
      {actionType === "give_pals" && (
        <GivePalToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playeruid={playeruid}
        />
      )}
      {actionType === "give_exps" && (
        <GiveExpToPlayer
          actionType={actionType}
          setActionType={setActionType}
          playeruid={playeruid}
        />
      )}
    </AlertDialog.Root>
  );
}

const ActionList = ({
  actionType,
  setActionType,
  playeruid,
}: {
  actionType: any;
  setActionType: any;
  playeruid: string;
}) => {
  const { appLanguage } = useAppLanguage();

  const rconOptions = useRconOptions();

  const handleSetAdmin = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `setadmin ${playeruid}`
    );
  };

  const handleKickUser = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `kickid ${playeruid}`
    );
  };

  const handleBanUser = () => {
    ipcRenderer.send("request-rcon-command", rconOptions, `banid ${playeruid}`);
  };

  const handleBanUserIP = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `ipbanid ${playeruid}`
    );
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>所有操作</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <div className="flex flex-col gap-4 pt-2">
          <ActionItem
            title={"設置為管理員"}
            subtitle={"將用戶設置設置為伺服器管理員"}
            buttonText={"設置"}
            onButtonClick={handleSetAdmin}
          />
          {/* <ActionItem
            title={"添加至白名單"}
            subtitle={"將用戶添加至白名單"}
            buttonText={"設置"}
          /> */}
          <ActionItem
            title={"踢出 Dalufish"}
            subtitle={"踢出該用戶"}
            buttonText={"踢出"}
            color="red"
            onButtonClick={handleKickUser}
          />
          <ActionItem
            title={"封鎖 Dalufish"}
            subtitle={"封鎖該用戶"}
            buttonText={"封鎖"}
            color="red"
            onButtonClick={handleBanUser}
          />
          <ActionItem
            title={"封鎖 Dalufish 的 IP 地址"}
            subtitle={"封鎖該用戶"}
            buttonText={"封鎖"}
            color="red"
            onButtonClick={handleBanUserIP}
          />
          <ActionItem
            title={"給予道具"}
            subtitle={"給予 Dalufish 指定數量的遊戲道具"}
            buttonText={"選擇"}
            color="yellow"
            onButtonClick={() => {
              setActionType("give_items");
            }}
          />
          <ActionItem
            title={"給予帕魯"}
            subtitle={"給予 Dalufish 指定帕魯"}
            buttonText={"選擇"}
            color="yellow"
            onButtonClick={() => {
              setActionType("give_pals");
            }}
          />
          <ActionItem
            title={"給予經驗值"}
            subtitle={"給予 Dalufish 指定數量的經驗值"}
            buttonText={"選擇"}
            color="yellow"
            onButtonClick={() => {
              setActionType("give_exps");
            }}
          />
          {/* <ActionItem
            title={"給予帕魯蛋"}
            subtitle={"給予 Dalufish 指定帕魯蛋"}
            buttonText={"選擇"}
            color="yellow"
          /> */}
        </div>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {LOCALES[appLanguage].Cancel}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
};

const ActionItem = ({
  title,
  subtitle,
  buttonText,
  color,
  onButtonClick,
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  color?: string;
  onButtonClick?: any;
}) => {
  return (
    <ul className="flex items-center justify-between">
      <Blockquote color={color as any}>
        <Heading size="3" style={{ color: "#222" }}>
          {title}
        </Heading>
        <Text size="2" color="gray">
          {subtitle}
        </Text>
      </Blockquote>
      <Button onClick={onButtonClick} color={color as any}>
        {buttonText}
      </Button>
    </ul>
  );
};
