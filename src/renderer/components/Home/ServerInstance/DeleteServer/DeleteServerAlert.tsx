import React, { useEffect, useState } from 'react';
import useThisServerInfo from '../ServerInfoProvider/useThisServerInfo';
import Channels from '../../../../../main/ipcs/channels';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import useTranslation from '../../../../hooks/translation/useTranslation';
import useThisWorldSettings from '../ServerInfoProvider/useThisWorldSettings';

export default function DeleteServerAlert() {
  const { t } = useTranslation();

  const { serverInfo } = useThisServerInfo();
  const { worldSettings } = useThisWorldSettings();

  const [inputServerName, setInputServerName] = useState('');

  const handleDeleteServer = () => {
    window.electron.ipcRenderer.invoke(
      Channels.deleteServerInstance,
      serverInfo?.serverId,
    );
  };

  const cancelDeleteServer = () => {
    setInputServerName('');
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('DeleteServer')}</AlertDialog.Title>
      <AlertDialog.Description size="2">
        {t('DeleteServerDesc')}
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
          <Button variant="soft" color="gray" onClick={cancelDeleteServer}>
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button
            disabled={
              inputServerName !== worldSettings?.ServerName?.slice(1, -1)
            }
            onClick={handleDeleteServer}
            variant="solid"
            color="red"
          >
            {t('VerifyDelete')}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
