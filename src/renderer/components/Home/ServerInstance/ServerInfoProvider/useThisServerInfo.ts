import { useContext } from 'react';
import ServerInfoContext from './ServerInfoContext';
import Channels from '../../../../../main/ipcs/channels';
import { ServerInstanceSetting } from '../../../../../types/ServerInstanceSetting.types';

const useThisServerInfo = () => {
  const info = useContext(ServerInfoContext);
  return {
    serverInfo: info,
    setServerInfo: (serverInfo: ServerInstanceSetting) => {
      window.electron.ipcRenderer.invoke(
        Channels.setServerInfo,
        info?.serverId,
        serverInfo,
      );
    },
  };
};

export default useThisServerInfo;
