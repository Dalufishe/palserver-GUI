import { AlertDialog, Button, Flex, Select } from '@radix-ui/themes';
import React from 'react';
import { MdCoffee, MdSettings } from 'react-icons/md';
import useTranslation from '../../../hooks/translation/useTranslation';
import _ from 'lodash';
import useLanguage from '../../../hooks/translation/useLanguage';
import { Language } from '../../../../../locales';
import Link from '../../Link';
import Channels from '../../../../main/ipcs/channels';
import useOnlineLinksMap from '../../../hooks/firebase/useOnlineLinksMap';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import useServerEngineVersion from '../../../hooks/server/useServerEngineVersion';

export default function Settings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const speicalThanksLink = useOnlineLinksMap('SupportPalserverGUI');
  const helpTranslateLink = useOnlineLinksMap('HelpTranslate');

  const [serverEngineVersion, setServerEngineVersion] =
    useServerEngineVersion();

  const settings = {
    Language: {
      id: 'Language',
      title: t('Language'),
      description: (
        <Link href={helpTranslateLink} appearance="light">
          {t('LanguageDesc')}
        </Link>
      ),
      type: 'options',
      options: ['繁體中文', '簡體中文', 'English'],
      values: ['zh_tw', 'zh_cn', 'en'],
      value: language,
      onValueChange(l: Language) {
        setLanguage(l);
      },
    },
    ClearCache: {
      id: 'ClearCache',
      title: t('ClearCache'),
      description: t('ClearCacheDesc'),
      type: 'button',
      buttonText: t('Clear'),
      async onButtonClick() {
        await window.electron.ipcRenderer.invoke(Channels.clearSystemCache);
        setServerEngineVersion(0);
      },
    },
    ServerInstancePath: {
      id: 'ServerInstancePath',
      title: t('ServerInstancePath'),
      description: window.electron.constant.USER_SERVER_INSTANCES_PATH(),
      type: 'button',
      buttonText: t('Change'),
      async onButtonClick() {
        const newInstancePath = await window.electron.selectFolder();
        window.electron.ipcRenderer.invoke(
          Channels.changeInstancePath,
          window.electron.constant.USER_SERVER_INSTANCES_PATH(),
          newInstancePath,
        );
      },
    },

    // SourceCode: {
    //   id: 'SourceCode',
    //   title: t('SourceCode'),
    //   description: (
    //     <Link
    //       href="https://github.com/Dalufishe/palserver-GUI"
    //       appearance="light"
    //     >
    //       {t('ClickLink')}
    //     </Link>
    //   ),
    // },
    // Discord: {
    //   id: 'Discord',
    //   title: 'Discord',
    //   description: (
    //     <Link href="https://discord.com/invite/sgMMdUZd3V" appearance="light">
    //       {t('ClickLink')}
    //     </Link>
    //   ),
    // },
    // SpecialThanks: {
    //   id: 'SpecialThanks',
    //   title: t('SpecialThanks'),
    //   description: (
    //     <Link href={speicalThanksLink} appearance="light">
    //       {t('SpeicalThanksDesc')}
    //     </Link>
    //   ),
    // },
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size="1" color="gray">
          <MdSettings />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="650px">
        {/* 應用程式設定 */}
        <AlertDialog.Title>{t('AppSettings')}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {/* 選項 */}
          <div className="my-6">
            {_.map(settings, (option, key) => (
              <SettingsItem {...option} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 mb-4">
            {/* <div
                onClick={() => {
                  window.electron.openLink('https://buymeacoffee.com/dalufish');
                }}
                className="select-none"
              >
                <img
                  src={`https://img.buymeacoffee.com/button-api/?text=${t(
                    'BuyMeACoffee',
                  )}&emoji=&slug=Dalufish&button_colour=FFDD00&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=ffffff`}
                  alt=""
                />
              </div> */}
            <FaDiscord
              size={48}
              color="#5562EA"
              className="cursor-pointer"
              onClick={() => {
                window.electron.openLink(
                  'https://discord.com/invite/sgMMdUZd3V',
                );
              }}
            />
            <FaGithub
              size={48}
              color="gray"
              className="cursor-pointer"
              onClick={() => {
                window.electron.openLink(
                  'https://github.com/Dalufishe/palserver-GUI',
                );
              }}
            />
            <MdCoffee
              size={48}
              color="#ff08a9"
              className="cursor-pointer"
              onClick={() => {
                window.electron.openLink('https://buymeacoffee.com/dalufish');
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
    </AlertDialog.Root>
  );
}

const SettingsItem = ({
  title,
  description,
  value,
  onValueChange,
  options,
  type,
  values,
  buttonText,
  onButtonClick,
}: any) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex flex-col w-[80%]">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="opacity-90">{description}</p>
      </div>

      {type === 'options' && (
        <Select.Root value={value} onValueChange={onValueChange}>
          <Select.Trigger />
          <Select.Content>
            {values.map((v, i) => (
              <Select.Item key={i} value={v}>
                {options[i]}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
      {type === 'button' && (
        <Button color="yellow" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
