import {
  AlertDialog,
  Button,
  Flex,
  ScrollArea,
  TextField,
} from "@radix-ui/themes";
import LOCALES from "../../../../../../locales";
import useAppLanguage from "../../../../../../redux/appLanguage/useAppLanguage";
import gamePalsOrigin from "../../../../../../constant/game-data/pals.json";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import PalItem from "./PalItem/PalItem";
import useRconOptions from "../../../../../../hooks/useRconOptions";
import { ipcRenderer } from "../../../../../../constant/contextBridge";

const gamePals = {};

for (let key in gamePalsOrigin) {
  // @ts-ignore
  gamePals[key] = gamePalsOrigin[key];
  // @ts-ignore
  gamePals["BOSS_" + key] = "BOSS_" + gamePalsOrigin[key];
}

console.log(gamePals);

export default function GivePalToPlayer({
  actionType,
  setActionType,
  playeruid,
}: {
  actionType: any;
  setActionType: any;
  playeruid: string;
}) {
  const { appLanguage } = useAppLanguage();

  // format: [{A:1}, {B:3}, {C:0}]
  const [palsAmount, setPalsAmount] = useState(
    Object.keys(gamePals).map((pal) => ({ [pal]: 0 }))
  );

  const [searchText, setSearchText] = useState("");

  const rconOptions = useRconOptions();
  // 執行指令
  const handleSendPal = () => {
    palsAmount.forEach((palAmount) => {
      const pal = Object.keys(palAmount)[0];
      const amount = Object.values(palAmount)[0];

      amount &&
        ipcRenderer.send(
          "request-rcon-command",
          rconOptions,
          `givepal ${playeruid} ${pal} ${amount}`
        );
    });
    // 重置
    setPalsAmount(Object.keys(gamePals).map((item) => ({ [item]: 0 })));
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>給予 Dalufish 帕魯</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <ScrollArea
          scrollbars="vertical"
          style={{ height: 392 }}
          className="pt-2"
        >
          <ul className="flex flex-col">
            {Object.values(gamePals)
              ?.filter((item) => {
                return item.startsWith("BOSS_")
                  ? LOCALES[appLanguage][item.slice(5)]
                      ?.toUpperCase()
                      ?.includes(searchText?.toUpperCase())
                  : LOCALES[appLanguage][item]
                      ?.toUpperCase()
                      ?.includes(searchText?.toUpperCase());
              })
              ?.map(
                (item) =>
                  item && (
                    <PalItem
                      type={item.startsWith("BOSS_") ? "boss" : "pal"}
                      pal={item}
                      amount={
                        Object.values(
                          palsAmount.filter(
                            (i) => Object.keys(i)[0] === item
                          )[0]
                        )[0]
                      }
                      onAmountChange={(a) => {
                        setPalsAmount([
                          ...palsAmount.filter(
                            (pal) => Object.keys(pal)[0] !== item
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
            placeholder="搜尋帕魯 . . ."
            size="2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </TextField.Root>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setActionType("list");
            }}
            variant="soft"
            color="gray"
          >
            回上一頁
          </Button>
          {palsAmount
            .map((v) => Object.values(v)[0])
            .reduce((a, b) => a + b) !== 0 && (
            <Button color="yellow" onClick={handleSendPal}>
              送出
            </Button>
          )}
        </div>
      </Flex>
    </AlertDialog.Content>
  );
}
