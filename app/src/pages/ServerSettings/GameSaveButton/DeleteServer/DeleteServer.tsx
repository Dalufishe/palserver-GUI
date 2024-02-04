import {
  AlertDialog,
  Button,
  ContextMenu,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import useGameSave from "../../../../hooks/useGameSave";
import useSaveMeta from "../../../../hooks/useSaveMeta";

export default function DeleteServer(props: { saveId: string }) {
  const gameSave = useGameSave(props.saveId);
  const gameSaveServerName = gameSave?.settings?.ServerName?.slice(1, -1);

  const [inputServerName, setInputServerName] = useState("");

  // 存檔 meta data
  const { metaData, setMetaData } = useSaveMeta();

  const handleDeleteSave = () => {
    setMetaData(metaData.filter((s: any) => s?.id !== props.saveId));
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>刪除伺服器</AlertDialog.Title>
      <AlertDialog.Description size="2">
        一旦伺服器被刪除，包括存檔、設定和玩家資料等在內的所有數據將會變得難以恢復。請在執行相關操作前仔細考慮。
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
            disabled={inputServerName !== gameSaveServerName}
            onClick={handleDeleteSave}
            variant="solid"
            color="red"
          >
            確認刪除
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
