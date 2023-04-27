const firebaseConfig = {
  // Your firebase configuration
 apiKey: "AIzaSyAwROKE_hU2jrclO5LxIoVZSvxks4GrqAQ",
  authDomain: "password-347421.firebaseapp.com",
  databaseURL: "https://password-347421-default-rtdb.firebaseio.com",
  projectId: "password-347421",
  storageBucket: "password-347421.appspot.com",
  messagingSenderId: "611056351749",
  appId: "1:611056351749:web:11810a6649733d748bfa6c",
  measurementId: "G-TZ27KYGS5B"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const itemRef = db.collection("items");
