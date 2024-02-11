import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { electron } from "../../../../constant/contextBridge";

export default function AddLuaModButton({
  button,
}: {
  button: React.ReactNode;
}) {
  const handleOpenModFolder = () => {
    electron.openExplorer(
      `/engine/steamapps/common/PalServer/Pal/Binaries/Win64/Mods`
    );
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{button}</AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>如何導入 Lua 模組？</AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>
              Lua
              模組是由幻獸帕魯支持的模組形式。要安裝下載的模組，請點擊「開啟模組資料夾」按鈕並將模組放入該資料夾中即可完成安裝。
            </div>
            <div>
              請注意，初次安裝的模組預設為「禁用」
              (須對模組點擊右鍵啟用)，並須在客戶端 (遊戲本體) 同步安裝才會生效。
            </div>
          </div>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              取消
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={handleOpenModFolder}
              variant="solid"
              color="yellow"
            >
              開啟模組資料夾
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
