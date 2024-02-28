import { collection, getFirestore } from "firebase/firestore";
import firebaseApp from "./initFirebase";

const firestore = getFirestore(firebaseApp);

const db = {
  Ads: collection(firestore, "Ads"),
  App: collection(firestore, "App"),
};

export default db;
