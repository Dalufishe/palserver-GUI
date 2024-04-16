import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../../../hooks/useTranslation';
import useThisWorldSettings from '../ServerInfoProvider/useThisWorldSettings';
import trimWorldSettingsString from '../../../../../utils/trimWorldSettingsString';
import Channels from '../../../../../main/ipcs/channels';
import useThisServerInfo from '../ServerInfoProvider/useThisServerInfo';

export default function DuplicateServerAlert() {
  const { t } = useTranslation();

  const { serverInfo } = useThisServerInfo();
  const { worldSettings } = useThisWorldSettings();

  const [inputServerName, setInputServerName] = useState('');
  useEffect(() => {
    setInputServerName(
      `${trimWorldSettingsString(worldSettings.ServerName)}-1`,
    );
  }, [worldSettings.ServerName]);

  const handleCopyServer = () => {
    window.electron.ipcRenderer.invoke(
      Channels.duplicateServerInstance,
      serverInfo?.serverId,
      `"${inputServerName}"`,
    );
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('DuplicateServer')}</AlertDialog.Title>
      <AlertDialog.Description size="2">
        {t('DuplicateServerDesc')}
      </AlertDialog.Description>

      <div className="my-4">
        <TextField.Root
          value={inputServerName}
          onChange={(e) => {
            setInputServerName(e.target.value);
          }}
          placeholder={t('PleaseEnterServerName')}
        />
      </div>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button onClick={handleCopyServer} variant="solid" color="yellow">
            {t('Confirm')}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
