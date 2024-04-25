import { useEffect, useState } from 'react';
import Channels from '../../../main/ipcs/channels';
import useTranslation from '../useTranslation';

const useRunServerInstall = () => {
  const { t } = useTranslation();

  const [serverEngineHasInstall, setServerEngineHasInstall] = useState(false);

  useEffect(() => {
    if (!serverEngineHasInstall) {
      window.electron.ipcRenderer.sendMessage(Channels.runServerInstall);
      window.electron.ipcRenderer.once(
        Channels.runServerInstallReply.DONE,
        () => {
          setServerEngineHasInstall(true);
          window.localStorage.setItem(
            'engine-has-install',
            JSON.stringify(true),
          );
          window.electron.ipcRenderer.sendMessage(
            'alert',
            t('EngineInstallFinish'),
          );
        },
      );
      window.electron.ipcRenderer.once(
        Channels.runServerInstallReply.ERROR,
        (data) => {
          if (data.errorMessage === 'ASCII') {
            window.electron.ipcRenderer.sendMessage(
              'alert',
              t('HasNotASCIIPath') + window.electron.node.__dirname(),
            );
          }
        },
      );
    }
  }, [serverEngineHasInstall]);

  return serverEngineHasInstall;
};

export default useRunServerInstall;
