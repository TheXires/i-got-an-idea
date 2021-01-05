import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC8pm_nz-g0SAaXjsYFe4jvHY-JVBFmfh0",
  authDomain: "i-got-an-idea.firebaseapp.com",
  projectId: "i-got-an-idea",
  storageBucket: "i-got-an-idea.appspot.com",
  messagingSenderId: "309914342547",
  appId: "1:309914342547:web:8f7fac8f12c2dbe769e966"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}