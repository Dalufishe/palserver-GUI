import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import { MdNotifications, MdSettings } from 'react-icons/md';
import { Button, Select } from '@radix-ui/themes';
import { useHistory } from 'react-router-dom';
import IconImage from '../../../../assets/icon.png';
import Settings from './Settings/Settings';
import useTranslation from '../../hooks/translation/useTranslation';
import { MdFolder } from 'react-icons/md';

export default function AboutSection() {
  const { t } = useTranslation();

  const history = useHistory();

  return (
    <div className="flex gap-2 p-2 bg-bg2 rounded-lg items-center relative">
      <div
        onClick={() => {
          history.push('/');
        }}
        className="flex gap-2 cursor-pointer"
      >
        <img src={IconImage} alt="icon" className="w-6 h-6" />
        <span>palserver GUI</span>
      </div>
      <div className="absolute right-2 flex gap-2 items-center">
        <Button
          size="1"
          color="pink"
          onClick={() => {
            window.electron.openLink('https://buymeacoffee.com/dalufish');
          }}
        >
          {t('SupportGUI')}
        </Button>
        <Button
          title={t('ServerListFolder')}
          onClick={() => {
            window.electron.openExplorer(
              window.electron.constant.USER_SERVER_INSTANCES_PATH(),
            );
          }}
          size="1"
          color="gray"
        >
          <MdFolder />
        </Button>
        <Settings />
      </div>
    </div>
  );
}
