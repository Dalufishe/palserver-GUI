import {
  AlertDialog,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import LOCALES from "../../../../../../locales";
import useAppLanguage from "../../../../../../redux/appLanguage/useAppLanguage";
import gameItems from "../../../../../../constant/game-data/items.json";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import useRconOptions from "../../../../../../hooks/useRconOptions";
import { ipcRenderer } from "../../../../../../constant/contextBridge";
import ItemItem from "./ItemItem/ItemItem";

export default function GiveItemToPlayer({
  playeruid,
  actionType,
  setActionType,
}: {
  playeruid: string;
  actionType: any;
  setActionType: any;
}) {
  const { appLanguage } = useAppLanguage();

  const [itemsAmount, setItemsAmount] = useState(
    Object.keys(gameItems).map((item) => ({ [item]: 0 }))
  );

  const [searchText, setSearchText] = useState("");

  const rconOptions = useRconOptions();
  const handleSendItem = () => {
    // 執行指令
    itemsAmount.forEach((itemAmount) => {
      const item = Object.keys(itemAmount)[0];
      const amount = Object.values(itemAmount)[0];

      amount &&
        ipcRenderer.send(
          "request-rcon-command",
          rconOptions,
          `give ${playeruid} ${item} ${amount}`
        );
    });
    // 重置
    setItemsAmount(Object.keys(gameItems).map((item) => ({ [item]: 0 })));
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>給予 Dalufish 道具</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <ScrollArea
          scrollbars="vertical"
          style={{ height: 392 }}
          className="pt-2"
        >
          <ul className="flex flex-col">
            {Object.values(gameItems)
              .filter((item) =>
                LOCALES[appLanguage][item]
                  ?.toUpperCase()
                  ?.includes(searchText?.toUpperCase())
              )
              .map(
                (item) =>
                  item && (
                    <ItemItem
                      item={item}
                      amount={
                        Object.values(
                          itemsAmount.filter(
                            (i) => Object.keys(i)[0] === item
                          )[0]
                        )[0]
                      }
                      onAmountChange={(a) => {
                        setItemsAmount([
                          ...itemsAmount.filter(
                            (i) => Object.keys(i)[0] !== item
                          ),
                          { [item]: a },
                        ]);
                      }}
                    />
                  )
              )}
          </ul>
        </ScrollArea>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="between">
        <TextField.Root>
          <TextField.Slot>
            <MdSearch height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder="搜尋道具 . . ."
            size="2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </TextField.Root>
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
          {itemsAmount
            .map((v) => Object.values(v)[0])
            .reduce((a, b) => a + b) !== 0 && (
            <Button color="yellow" onClick={handleSendItem}>
              送出
            </Button>
          )}
        </div>
      </Flex>
    </AlertDialog.Content>
  );
}
