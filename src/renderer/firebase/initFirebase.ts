import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAr-v78qAWwJEUnE7N6eh0x46f3wfJk36U',
  authDomain: 'palserver-gui.firebaseapp.com',
  projectId: 'palserver-gui',
  storageBucket: 'palserver-gui.appspot.com',
  messagingSenderId: '536539455986',
  appId: '1:536539455986:web:0254d9efb50cda1c148b6b',
  measurementId: 'G-H54819HQRF',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
