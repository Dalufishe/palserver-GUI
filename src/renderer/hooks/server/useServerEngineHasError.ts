import { useEffect, useState } from 'react';
import useLocalState from '../useLocalState';
import Channels from '../../../main/ipcs/channels';

const useServerEngineHasError = () => {
  const [serverEngineHasError, setServerEngineHasError] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(Channels.getEngineHasError)
      .then((result) => {
        setServerEngineHasError(result);
      });
  });

  return serverEngineHasError;
};

export default useServerEngineHasError;
