import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import useTranslation from '../../../hooks/translation/useTranslation';
import _ from 'lodash';
import Channels from '../../../../main/ipcs/channels';
import SecureEye from '../../SecureEye';
import uniqid from 'uniqid';
import { SERVER_URL, VERSION } from '../../../../constant/app';
import Link from '../../Link';

const defaultServerConfigOptions = {
  serverName: {
    id: 'ServerName',
    value: '',
    secure: false,
    showValue: true,
    required: true,
  },
  publicIP: {
    id: 'PublicIP',
    value: '',
    secure: true,
    showValue: false,
    required: false,
  },
  publicPort: {
    id: 'PublicPort',
    value: '8211',
    secure: false,
    showValue: true,
    required: true,
  },
  serverPassword: {
    id: 'ServerPassword',
    value: '',
    secure: true,
    showValue: false,
    required: false,
  },
  adminPassword: {
    id: 'AdminPassword',
    value: uniqid(),
    secure: true,
    showValue: false,
    required: true,
  },
};

export default function CreateServerAlert() {
  const { t, language } = useTranslation();

  const [serverConfigOptions, setServerConfigOptions] = useState(
    defaultServerConfigOptions,
  );

  const handleCreateServer = async () => {
    try {
      // collect data
      fetch(`${SERVER_URL}/api/server/create-count?version=${VERSION}`, {
        method: 'PUT',
      }).then((response) => response.json());
    } catch (e) {
      //
    }

    // create server
    window.electron.ipcRenderer.invoke(Channels.createServerInstance, {
      ServerName: `"${serverConfigOptions.serverName.value}"`,
      PublicIP: `"${serverConfigOptions.publicIP.value}"`,
      PublicPort: serverConfigOptions.publicPort.value,
      ServerPassword: `"${serverConfigOptions.serverPassword.value}"`,
      AdminPassword: `"${serverConfigOptions.adminPassword.value}"`,
      RCONEnabled: true,
      RESTAPIEnabled: true,
    });
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>{t('CreateServer')}</AlertDialog.Title>
      <div className="flex flex-col w-[78%] pb-4">
        {_.map(serverConfigOptions, (option, key) => (
          <div className="w-full my-2 flex gap-2 items-center justify-between relative">
            <span>{t(option.id)}：</span>
            <TextField.Root
              type={option.showValue ? 'text' : 'password'}
              placeholder={option.required ? '' : t('CantBeEmpty')}
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
      <Link
        appearance="dark"
        href={`${SERVER_URL}/data/links/${language}/HowToGetIPAdress`}
      >
        {t('HowToGetIPAdress')}
      </Link>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button
            variant="soft"
            color="gray"
            onClick={() => {
              setServerConfigOptions(defaultServerConfigOptions);
            }}
          >
            {t('Cancel')}
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button
            disabled={
              !(
                serverConfigOptions.serverName.value &&
                serverConfigOptions.publicPort.value &&
                serverConfigOptions.adminPassword.value
              )
            }
            onClick={handleCreateServer}
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
