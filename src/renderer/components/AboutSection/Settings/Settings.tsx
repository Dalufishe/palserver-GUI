import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { MdSettings } from 'react-icons/md';
import useTranslation from '../../../hooks/useTranslation';

export default function Settings() {
  const { t } = useTranslation();

  const settings = {
    Language: {
      id: 'Language',
      title: t('Language'),
      description: '幫助我們翻譯 palserver GUI',
      type: 'options',
      options: ['繁體中文', 'English'],
      value: '繁體中文',
    },
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size="1" color="gray">
          <MdSettings />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="650px">
        <AlertDialog.Title>應用程式設定</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <div className="my-6">
            <SettingsItem />
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
    </AlertDialog.Root>
  );
}

const SettingsItem = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">語言</h3>
        <p className="opacity-90">幫助我們翻譯 palserver GUI</p>
      </div>
    </div>
  );
};
