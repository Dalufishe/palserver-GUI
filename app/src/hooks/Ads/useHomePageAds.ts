import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import db from "../../firebase/db";

const useHomePageAds = () => {
  const query = useQuery(
    "home-page-ads",
    async () => {
      const docRef = doc(db.Ads, "HomePage");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        return {};
      }
    },
    { staleTime: 1000 * 60 }
  );
  return query;
};

export default useHomePageAds;
