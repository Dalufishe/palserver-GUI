import {
  AlertDialog,
  Button,
  Flex,
  ScrollArea,
  Slider,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import useRconOptions from "../../../../../../hooks/useRconOptions";
import { ipcRenderer } from "../../../../../../constant/contextBridge";

export default function GiveExpToPlayer({
  actionType,
  setActionType,
  playeruid,
}: {
  actionType: any;
  setActionType: any;
  playeruid: string;
}) {
  const [exp, setExp] = useState(100000);

  const rconOptions = useRconOptions();

  const handleSendExp = () => {
    ipcRenderer.send(
      "request-rcon-command",
      rconOptions,
      `give_exp ${playeruid} ${exp}`
    );
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>給予 Dalufish 經驗值</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <div className="pt-2 flex items-center gap-4">
          <div className="flex-[5]">
            <Slider
              min={0}
              max={400000}
              value={[exp]}
              onValueChange={(v) => {
                setExp(v);
              }}
            />
          </div>
          <div className="flex-1">
            <TextFieldInput
              value={exp}
              onChange={(e) => {
                setExp(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setActionType("list");
            }}
            variant="soft"
            color="gray"
          >
            回上一頁
          </Button>
          <Button color="yellow" onClick={handleSendExp}>
            送出
          </Button>
        </div>
      </Flex>
    </AlertDialog.Content>
  );
}
