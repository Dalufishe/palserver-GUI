import { useState } from 'react';
import useTranslation from '../../../../hooks/useTranslation';
import Channels from '../../../../../main/ipcs/channels';
import useThisServerInfo from '../ServerInfoProvider/useThisServerInfo';
import {
  AlertDialog,
  Button,
  Flex,
  Separator,
  TextField,
} from '@radix-ui/themes';
import _ from 'lodash';
import useThisWorldSettings from '../ServerInfoProvider/useThisWorldSettings';
import trimWorldSettingsString from '../../../../../utils/trimWorldSettingsString';
import SecureEye from '../../../SecureEye';

export default function EditServerAlert() {
  const { t } = useTranslation();

  const { serverInfo } = useThisServerInfo();
  const { worldSettings } = useThisWorldSettings();

  const [serverConfigOptions, setServerConfigOptions] = useState({
    serverName: {
      id: 'ServerName',
      value: '',
      secure: false,
      showValue: true,
    },
    publicIP: {
      id: 'PublicIP',
      value: '',
      secure: true,
      showValue: false,
    },
    publicPort: {
      id: 'PublicPort',
      value: '',
      secure: false,
      showValue: true,
    },
    serverPassword: {
      id: 'ServerPassword',
      value: '',
      secure: true,
      showValue: false,
    },
    adminPassword: {
      id: 'AdminPassword',
      value: '',
      secure: true,
      showValue: false,
    },
  });

  const handleEditServer = async () => {
    await window.electron.ipcRenderer.invoke(
      Channels.editServerInstance,
      serverInfo?.serverId,
      {
        ServerName: serverConfigOptions.serverName.value
          ? `"${serverConfigOptions.serverName.value}"`
          : worldSettings.ServerName,
        PublicIP: serverConfigOptions.publicIP.value
          ? `"${serverConfigOptions.publicIP.value}"`
          : worldSettings.PublicIP,
        PublicPort:
          serverConfigOptions.publicPort.value || worldSettings.PublicPort,
        ServerPassword: serverConfigOptions.serverPassword.value
          ? `"${serverConfigOptions.serverPassword.value}"`
          : worldSettings.ServerPassword,
        AdminPassword: serverConfigOptions.adminPassword.value
          ? `"${serverConfigOptions.adminPassword.value}"`
          : worldSettings.AdminPassword,
      },
    );
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('EditServer')}</AlertDialog.Title>
      <div className="flex flex-col w-[78%]">
        {_.map(serverConfigOptions, (option, key) => (
          <div className="w-full my-2 flex gap-2 items-center justify-between relative">
            <span>{t(option.id)}：</span>
            <TextField.Root
              type={option.showValue ? 'text' : 'password'}
              placeholder={
                option.showValue
                  ? trimWorldSettingsString(worldSettings[option.id])
                  : trimWorldSettingsString(
                      worldSettings[option.id],
                    )?.replaceAll(/./gu, '•')
              }
              value={option.value}
              onChange={(e) => {
                setServerConfigOptions({
                  ...serverConfigOptions,
                  ...{ [key]: { ...option, value: e.target.value } },
                });
              }}
            />
            {option.secure && (
              <div className="absolute -right-12">
                <SecureEye
                  open={option?.showValue}
                  onOpenChange={(o) => {
                    setServerConfigOptions({
                      ...serverConfigOptions,
                      ...{ [key]: { ...option, showValue: o } },
                    });
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button onClick={handleEditServer} variant="solid" color="yellow">
            {t('Confirm')}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
