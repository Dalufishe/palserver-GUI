import { useQuery } from 'react-query';
import versionToValue from '../../utils/versionToValue';
import { SERVER_URL } from '../../../constant/app';

const useLatestVersion = () => {
  const { data: latestVersion } = useQuery(
    'app-version',
    async () => {
      const res = await fetch(`${SERVER_URL}/data/palserver-gui/version`);
      const data = await res.json();
      return data.version || '0.0.0';
    },
    {
      staleTime: 1000 * 60,
    },
  );

  return {
    version: latestVersion,
    versionValue: versionToValue(latestVersion || ''),
  };
};

export default useLatestVersion;
