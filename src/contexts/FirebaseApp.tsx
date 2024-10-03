import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAi31ffqr4J-63QbEs2kcy9FSnHaF6Puyc",
  authDomain: "todo-app-6f3ce.firebaseapp.com",
  databaseURL: "https://todo-app-6f3ce-default-rtdb.firebaseio.com",
  projectId: "todo-app-6f3ce",
  storageBucket: "todo-app-6f3ce.appspot.com",
  messagingSenderId: "839896971343",
  appId: "1:839896971343:web:50df1c11db973d634c523a",
};

export const firebaseApp = initializeApp(firebaseConfig);
