import { useQuery } from 'react-query';
import db from '../../firebase/db';
import { doc, getDoc } from 'firebase/firestore';

const useOnlineLinksMap = (id: string) => {
  const { data: link } = useQuery(
    ['online-links-map', id],
    async () => {
      const docRef = doc(db.Links, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
      // docSnap.data() will be undefined in this case
      return {};
    },
    {
      select(data) {
        return data?.link || '';
      },
      staleTime: 1000 * 60,
    },
  );

  return link;
};

export default useOnlineLinksMap;
