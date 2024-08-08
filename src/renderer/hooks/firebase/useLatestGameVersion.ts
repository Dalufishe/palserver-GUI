import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase/db';
import versionToValue from '../../utils/versionToValue';

const useLatestGameVersion = () => {
  const { data: latestVersion } = useQuery(
    'game-version',
    async () => {
      const docRef = doc(db.Game, 'version');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        return {};
      }
    },
    {
      select(data) {
        return data?.versionNumber || '';
      },
      staleTime: 1000 * 60,
    },
  );

  return {
    version: latestVersion,
    versionValue: versionToValue(latestVersion || ''),
  };
};

export default useLatestGameVersion;
