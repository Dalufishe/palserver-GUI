import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase/db';
import versionToValue from '../../utils/versionToValue';
import { SERVER_URL } from '../../../constant/app';

const useLatestGameVersion = () => {
  const { data: latestVersion } = useQuery(
    'game-version',
    async () => {
      const res = await fetch(`${SERVER_URL}/data/palworld/version`);
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

export default useLatestGameVersion;
