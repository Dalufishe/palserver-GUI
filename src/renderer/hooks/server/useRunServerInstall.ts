import { useEffect, useState } from 'react';
import Channels from '../../../main/ipcs/channels';
import useTranslation from '../translation/useTranslation';
import electronAlert from '../../utils/electronAlert';

const useRunServerInstall = () => {
  const { t } = useTranslation();

  const [serverEngineHasInstall, setServerEngineHasInstall] = useState(false);
  const [installPercentage, setInstallPercentage] = useState(0);

  useEffect(() => {
    if (!serverEngineHasInstall) {
      // 執行伺服器安裝
      window.electron.ipcRenderer.sendMessage(Channels.runServerInstall);
      window.electron.ipcRenderer.once(
        Channels.runServerInstallReply.DONE,
        () => {
          setServerEngineHasInstall(true);
          // electronAlert(t('EngineInstallFinish'));
        },
      );
      window.electron.ipcRenderer.once(
        Channels.runServerInstallReply.ERROR,
        (data) => {
          if (data.errorMessage === 'ASCII') {
            electronAlert(
              // eslint-disable-next-line no-underscore-dangle
              t('HasNotASCIIPath') + window.electron.node.__dirname(),
            );
          }
        },
      );
      window.electron.ipcRenderer.on(
        Channels.runServerInstallReply.PROGRESS,
        (data) => {
          if (data.message) {
            console.log(data.message);
          }
        },
      );
    }
  }, [serverEngineHasInstall]);

  return [serverEngineHasInstall, installPercentage];
};

export default useRunServerInstall;
