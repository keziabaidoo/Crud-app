import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDY7vUeub2M_C1GkYCcZMRjoSxwTETlFLE",
    authDomain: "fir-crud-2116e.firebaseapp.com",
    projectId: "fir-crud-2116e",
    storageBucket: "fir-crud-2116e.appspot.com",
    messagingSenderId: "365318039037",
    appId: "1:365318039037:web:f23d3cceb7fbfb89b1a594",
    measurementId: "G-MQ4P69TDDX"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore()