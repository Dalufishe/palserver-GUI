import { collection, getFirestore } from 'firebase/firestore';
import firebaseApp from './initFirebase';

const firestore = getFirestore(firebaseApp);

const db = {
  App: collection(firestore, 'App'),
  Links: collection(firestore, 'Links'),
  Game: collection(firestore, 'Game'),
  ServerInfo: collection(firestore, 'ServerInfo'),
};

export default db;
