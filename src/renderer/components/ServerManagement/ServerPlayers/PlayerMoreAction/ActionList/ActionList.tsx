/* eslint-disable prefer-template */
/* eslint-disable react/jsx-curly-brace-presence */
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import Channels from '../../../../../../main/ipcs/channels';
import useTranslation from '../../../../../hooks/useTranslation';
import useSelectedServerInstance from '../../../../../redux/selectedServerInstance/useSelectedServerInstance';
import ActionItem from '../AcionItem/AcionItem';

export default function ActionList({
  actionType,
  setActionType,
  playerId,
  steamid,
  name,
}: {
  actionType: any;
  setActionType: any;
  playerId: string;
  steamid: string;
  name: string;
}) {
  const { t } = useTranslation();

  const { selectedServerInstance } = useSelectedServerInstance();
  // const isUsingPalguard = useIsUsingPalguard(selectedGameSave);

  const handleSetAdmin = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `setadmin ${steamid.slice(6)}`,
    );
  };

  const handleKickUser = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `KickPlayer ${steamid}`,
    );
  };

  const handleBanUser = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `BanPlayer ${playerId}`,
    );
  };

  const handleBanUserIP = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `ipbanid ${steamid.slice(6)}`,
    );
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>進階操作</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <div className="flex flex-col gap-4 pt-2">
          <ActionItem
            title={'設置為管理員'}
            subtitle={'將用戶設置設置為伺服器管理員'}
            buttonText={'設置'}
            onButtonClick={handleSetAdmin}
          />
          <ActionItem
            title={'踢出 ' + name}
            subtitle={'踢出該用戶'}
            buttonText={'踢出'}
            color="red"
            onButtonClick={handleKickUser}
          />
          <ActionItem
            title={'封鎖 ' + name}
            subtitle={'封鎖該用戶'}
            buttonText={'封鎖'}
            color="red"
            onButtonClick={handleBanUser}
          />
          <ActionItem
            title={`封鎖 ${name} 的 IP 地址`}
            subtitle={'封鎖該用戶'}
            buttonText={'封鎖'}
            color="red"
            onButtonClick={handleBanUserIP}
          />
          <ActionItem
            title={'給予道具'}
            subtitle={`給予 ${name} 指定數量的遊戲道具`}
            buttonText={'選擇'}
            color="yellow"
            onButtonClick={() => {
              setActionType('give_items');
            }}
          />
          <ActionItem
            title={'給予帕魯'}
            subtitle={`給予 ${name} 指定帕魯`}
            buttonText={'選擇'}
            color="yellow"
            onButtonClick={() => {
              setActionType('give_pals');
            }}
          />
          <ActionItem
            title={'給予經驗值'}
            subtitle={`給予 ${name} 指定數量的經驗值`}
            buttonText={'選擇'}
            color="yellow"
            onButtonClick={() => {
              setActionType('give_exps');
            }}
          />
        </div>
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  );
}
