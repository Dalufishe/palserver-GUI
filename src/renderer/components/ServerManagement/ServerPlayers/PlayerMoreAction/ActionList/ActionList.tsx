/* eslint-disable prefer-template */
/* eslint-disable react/jsx-curly-brace-presence */
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import Channels from '../../../../../../main/ipcs/channels';
import useTranslation from '../../../../../hooks/translation/useTranslation';
import useSelectedServerInstance from '../../../../../redux/selectedServerInstance/useSelectedServerInstance';
import ActionItem from '../AcionItem/AcionItem';
import formatLocale from '../../../../../utils/formatLocale';

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

  const pgSteamId = 'steam_' + steamid.slice(6);

  const { selectedServerInstance } = useSelectedServerInstance();
  // const isUsingPalguard = useIsUsingPalguard(selectedGameSave);

  const handleSetAdmin = () => {
    window.electron.ipcRenderer.invoke(
      Channels.sendRCONCommand,
      selectedServerInstance,
      `setadmin ${pgSteamId}`,
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
      `ipbanid ${pgSteamId}`,
    );
  };

  return (
    <AlertDialog.Content>
      <AlertDialog.Title>{t('AdvancedActions')}</AlertDialog.Title>
      <AlertDialog.Description>
        {/* <p className="my-2">進階操作使用第三方插件 PalGuard 實現</p> */}
        <div className="flex flex-col gap-4 pt-2">
          <ActionItem
            title={t('SetAsAdmin')}
            subtitle={formatLocale(t('SetAsAdminDesc'), [name])}
            buttonText={t('Set')}
            onButtonClick={handleSetAdmin}
          />
          <ActionItem
            title={t('KickPlayer') + ' ' + name}
            subtitle={formatLocale(t('KickPlayerDesc'), [name, name])}
            buttonText={t('KickPlayer')}
            color="red"
            onButtonClick={handleKickUser}
          />
          <ActionItem
            title={t('Ban') + ' ' + name}
            subtitle={formatLocale(t('BanDesc'), [name, name])}
            buttonText={t('Ban')}
            color="red"
            onButtonClick={handleBanUser}
          />
          <ActionItem
            title={formatLocale(t('BanIP'), [name])}
            subtitle={formatLocale(t('BanDesc'), [name, name])}
            buttonText={t('Ban')}
            color="red"
            onButtonClick={handleBanUserIP}
          />
          <ActionItem
            title={t('GiveItem')}
            subtitle={formatLocale(t('GiveItemDesc'), [name])}
            buttonText={t('Choose')}
            color="yellow"
            onButtonClick={() => {
              setActionType('give_items');
            }}
          />
          <ActionItem
            title={t('GivePal')}
            subtitle={formatLocale(t('GivePalDesc'), [name])}
            buttonText={t('Choose')}
            color="yellow"
            onButtonClick={() => {
              setActionType('give_pals');
            }}
          />
          <ActionItem
            title={t('GiveExp')}
            subtitle={formatLocale(t('GiveExpDesc'), [name])}
            buttonText={t('Give')}
            color="yellow"
            hasInput
            inputDefaultValue={100000}
            onButtonClick={(value: number) => {
              window.electron.ipcRenderer.invoke(
                Channels.sendRCONCommand,
                selectedServerInstance,
                `give_exp steam_${steamid.slice(6)} ${value}`,
              );
            }}
          />
          <ActionItem
            title={t('GiveRelic')}
            subtitle={formatLocale(t('GiveRelicDesc'), [name])}
            buttonText={t('Give')}
            color="yellow"
            hasInput
            inputDefaultValue={1}
            onButtonClick={(value: number) => {
              window.electron.ipcRenderer.invoke(
                Channels.sendRCONCommand,
                selectedServerInstance,
                `give_relic ${pgSteamId} ${value}`,
              );
            }}
          />
          <ActionItem
            title={t('GiveTech')}
            subtitle={formatLocale(t('GiveTechDesc'), [name])}
            buttonText={t('Give')}
            color="yellow"
            hasInput
            inputDefaultValue={1}
            onButtonClick={(value: number) => {
              window.electron.ipcRenderer.invoke(
                Channels.sendRCONCommand,
                selectedServerInstance,
                `givetech ${pgSteamId} ${value}`,
              );
            }}
          />
          <ActionItem
            title={t('GiveBossTech')}
            subtitle={formatLocale(t('GiveBossTechDesc'), [name])}
            buttonText={t('Give')}
            color="yellow"
            hasInput
            inputDefaultValue={1}
            onButtonClick={(value: number) => {
              window.electron.ipcRenderer.invoke(
                Channels.sendRCONCommand,
                selectedServerInstance,
                `givebosstech ${pgSteamId} ${value}`,
              );
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
