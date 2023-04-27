const firebaseConfig = {
  // Your Firebase configuration goes here
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

const db = firebase.database();
const itemRef = db.ref("items");

const ADMIN_UID = "zaRkadq2W9byUgBYTAdxOfLwukF3";
const USER_UID = "IgbE2iXfPsNROXrQBipOoWgm24j2";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    if (user.uid === ADMIN_UID) {
      // Show the admin panel forms
      document.querySelector(".admin").style.display = "block";
    } else {
      // Hide the admin panel forms
      document.querySelector(".admin").style.display = "none";
    }
    // Show the item list
    showItemList();
  } else {
    // User is signed out
    // Hide the admin panel forms and item list
    document.querySelector(".admin").style.display = "none";
    document.querySelector("#item-list").style.display = "none";
    // Show the login form
    showLoginForm();
  }
});

function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      // Login successful
    })
    .catch(function(error) {
      // Login failed
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Login failed:", errorCode, errorMessage);
      showMessage(errorMessage);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(function() {
      // Logout successful
    })
    .catch(function(error) {
      // Logout failed
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Logout failed:", errorCode, errorMessage);
      showMessage(errorMessage);
    });
}
