import {
  AlertDialog,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes';
import useTranslation from '../../../../../hooks/translation/useTranslation';
import { useState } from 'react';
import gameItems from '../../../../../../../assets/game-data/data/items.json';
import Channels from '../../../../../../main/ipcs/channels';
import useSelectedServerInstance from '../../../../../redux/selectedServerInstance/useSelectedServerInstance';
import ItemItem from './ItemItem/ItemItem';
import { MdSearch } from 'react-icons/md';
import formatLocale from '../../../../../utils/formatLocale';

export default function GiveItemToPlayer({
  actionType,
  setActionType,
  playerId,
  steamId,
  name,
}: {
  actionType: any;
  setActionType: any;
  playerId: string;
  steamId: string;
  name: string;
}) {
  const { t } = useTranslation();
  const { selectedServerInstance } = useSelectedServerInstance();

  const [searchText, setSearchText] = useState('');

  const [itemsAmount, setItemsAmount] = useState(
    Object.keys(gameItems).map((item) => ({ [item]: 0 })),
  );
  const handleSendItem = () => {
    // 執行指令
    itemsAmount.forEach((itemAmount) => {
      const item = Object.keys(itemAmount)[0];
      const amount = Object.values(itemAmount)[0];

      if (amount) {
        window.electron.ipcRenderer.invoke(
          Channels.sendRCONCommand,
          selectedServerInstance,
          `give ${steamId.slice(6)} ${item} ${amount}`,
        );
      }
    });
    // 重置
    setItemsAmount(Object.keys(gameItems).map((item) => ({ [item]: 0 })));
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>
        {formatLocale(t('GivePlayerItem'), [name])}
      </AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <ScrollArea
          scrollbars="vertical"
          style={{ height: 392 }}
          className="pt-2"
        >
          <ul className="flex flex-col">
            {Object.values(gameItems)
              .filter(
                (item) =>
                  t(item.id)
                    ?.toUpperCase()
                    ?.includes(searchText?.toUpperCase()),
              )
              .map(
                (item) =>
                  item && (
                    <ItemItem
                      item={item}
                      amount={
                        Object.values(
                          itemsAmount.filter(
                            (i) => Object.keys(i)[0] === item.id,
                          )[0],
                        )[0]
                      }
                      onAmountChange={(a) => {
                        setItemsAmount([
                          ...itemsAmount.filter(
                            (i) => Object.keys(i)[0] !== item.id,
                          ),
                          { [item.id]: a },
                        ]);
                      }}
                    />
                  ),
              )}
          </ul>
        </ScrollArea>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="between">
        <TextField.Root
          placeholder="搜尋道具 . . ."
          size="2"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        >
          <TextField.Slot>
            <MdSearch height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setActionType('list');
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
