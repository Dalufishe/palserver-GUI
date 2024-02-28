import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import db from "../../firebase/db";

const useHomePageSmallAds = () => {
  const query = useQuery(
    "home-page-small-ads",
    async () => {
      const docRef = doc(db.Ads, "HomePageSmall");
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

export default useHomePageSmallAds;
