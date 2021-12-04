import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDVfr4dpAjJ9Mqs-ba5Zr2Qpocjg3DdObs",
    authDomain: "odkrywajcie.firebaseapp.com",
    projectId: "odkrywajcie",
    storageBucket: "odkrywajcie.appspot.com",
    messagingSenderId: "6070246406",
    appId: "1:6070246406:web:6d55d0163da0b6f613b787",
    measurementId: "G-3HZGB0RV4W",
    databaseURL: 'https://odkrywajcie.firebaseio.com'
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

firebase.analytics();

firebase.auth();
