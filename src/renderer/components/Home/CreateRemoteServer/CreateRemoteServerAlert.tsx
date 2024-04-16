import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import _ from 'lodash';

export default function CreateRemoteServerAlert() {
  const { t } = useTranslation();

  const [serverConfigOptions, setServerConfigOptions] = useState({
    publicIP: { id: 'PublicIP', value: '' },
    publicPort: { id: 'PublicPort', value: '' },
    adminPassword: { id: 'AdminPassword', value: '' },
  });

  // const handleCreateServer = async () => {
  //   const res = await window.electron.ipcRenderer.invoke(
  //     Channels.createServerInstance,
  //     { serverName:  },
  //   );
  //   console.log(res);
  // };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('CreateRemoteServer')}</AlertDialog.Title>
      <div className="flex flex-col w-[78%]">
        {_.map(serverConfigOptions, (option, key) => (
          <div className="w-full my-2 flex gap-2 items-center justify-between">
            <span>{t(option.id)}：</span>
            <TextField.Root
              placeholder=""
              value={option.value}
              onChange={(e) => {
                setServerConfigOptions({
                  ...serverConfigOptions,
                  ...{ [key]: { ...option, value: e.target.value } },
                });
              }}
            />
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
          <Button
            // disabled={!serverConfigOptions.serverName.value}
            // onClick={handleCreateServer}
            variant="solid"
            color="yellow"
          >
            {t('Create')}
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
