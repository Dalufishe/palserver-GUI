import { useEffect, useState } from "react";
import { ipcRenderer } from "../constant/contextBridge";
import versionToValue from "../utils/versionToValue";
import { useQuery } from "react-query";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/db";

const useLatestVersion = () => {
  const { data: latestVersion } = useQuery(
    "app-version",
    async () => {
      const docRef = doc(db.App, "version");
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
        return data?.versionNumber || "";
      },
      staleTime: 1000 * 60,
    }
  );

  return {
    version: latestVersion,
    versionValue: versionToValue(latestVersion || ""),
  };
};

export default useLatestVersion;
