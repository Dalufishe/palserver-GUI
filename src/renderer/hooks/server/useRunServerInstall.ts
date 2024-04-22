import { useEffect, useState } from 'react';
import Channels from '../../../main/ipcs/channels';
import useTranslation from '../useTranslation';

const useRunServerInstall = () => {
  const { t } = useTranslation();

  const [serverEngineHasInstall, setServerEngineHasInstall] = useState(
    JSON.parse(window.localStorage.getItem('engine-has-install') || 'false'),
  );

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
          window.alert(t('EngineInstallFinish'));
        },
      );
      window.electron.ipcRenderer.once(
        Channels.runServerInstallReply.ERROR,
        (data) => {
          if (data.errorMessage === 'ASCII') {
            window.alert(
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
