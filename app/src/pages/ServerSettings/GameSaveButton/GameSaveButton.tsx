import React, { useEffect, useState } from "react";
import CuteImg from "../../../assets/images/start.webp";
import { ipcRenderer } from "../../../constant/contextBridge";
import useGameSave from "../../../hooks/useGameSave";
import useSelectedGameSave from "../../../redux/selectGameSave/useSelectedGameSave";
import { cn } from "../../../utils/cn";
import {
  AlertDialog,
  Button,
  ContextMenu,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";

type Props = {
  saveMetaData: { id: string };
};

export default function SaveButton(props: Props) {
  const { setSelectedGameSave } = useSelectedGameSave();
  const save = useGameSave(props.saveMetaData?.id);

  const [inputServerName, setInputServerName] = useState("");

  const handleSelect = () => {
    setSelectedGameSave(props.saveMetaData?.id);
  };

  return (
    <AlertDialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            onClick={handleSelect}
            className={cn(
              "flex flex-col gap-1 items-center w-28 h-24 p-1 cursor-pointer rounded-lg hover:bg-bg1"
            )}
          >
            <img src={CuteImg} alt="" className="w-12 h-12" />
            <span className="text-xs text-center">
              {save?.settings?.ServerName.slice(1, -1)}
            </span>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          {/* <ContextMenu.Separator /> */}
          <AlertDialog.Trigger>
            <ContextMenu.Item shortcut="⌫" color="red">
              刪除伺服器
            </ContextMenu.Item>
          </AlertDialog.Trigger>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>刪除伺服器</AlertDialog.Title>
        <AlertDialog.Description size="2">
          一旦伺服器被刪除，包括存檔、設定和玩家資料等在內的所有數據都將無法恢復。請在執行相關操作前仔細考慮。
        </AlertDialog.Description>

        <div className="my-2">
          <TextFieldInput
            value={inputServerName}
            onChange={(e) => {
              setInputServerName(e.target.value);
            }}
            placeholder="請輸入伺服器名稱"
          />
        </div>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              取消
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              disabled={inputServerName !== save?.settings?.ServerName?.slice(1, -1)}
              variant="solid"
              color="red"
            >
              確認刪除
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
