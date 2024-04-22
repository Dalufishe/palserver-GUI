import { AlertDialog, Button, Flex, Slider, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import useSelectedServerInstance from '../../../../../redux/selectedServerInstance/useSelectedServerInstance';
import Channels from '../../../../../../main/ipcs/channels';
import formatLocale from '../../../../../utils/formatLocale';
import useTranslation from '../../../../../hooks/useTranslation';

export default function GiveExpToPlayer({
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

  const [exp, setExp] = useState(100000);

  const handleSendExp = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `give_exp ${steamId.slice(6)} ${exp}`,
    );
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>
        {formatLocale(t('GivePlayerItem'), [name])}
      </AlertDialog.Title>
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
            <TextField.Root
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
              setActionType('list');
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
