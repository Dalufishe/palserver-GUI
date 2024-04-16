import useThisServerInfo from './useThisServerInfo';
import useWorldSettings from '../../../../hooks/server/world-settings/useWorldSettings';

const useThisWorldSettings = () => {
  const { serverInfo } = useThisServerInfo();

  return useWorldSettings(serverInfo?.serverId!);
};

export default useThisWorldSettings;
