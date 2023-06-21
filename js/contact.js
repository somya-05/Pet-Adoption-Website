// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcs6NX16Wjo3pc74yNaz2whQfL-TqxUxI",
  authDomain: "urbantailsweb.firebaseapp.com",
  projectId: "urbantailsweb",
  storageBucket: "urbantailsweb.appspot.com",
  messagingSenderId: "554410134536",
  appId: "1:554410134536:web:d4fd1c6154fd842f6d95bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage(app);



// read data
auth.onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    

    const dbref = ref(database);
    get(child(dbref, "users/" + uid)).then((snapshot) => {
      if (snapshot.exists()) {
        var result = snapshot.val();
        var email = result.email
        var fullname = result.fullname
        document.getElementById("name").textContent = fullname
        // document.getElementById("email").textContent = email



        // Retrieving Image from the database
        const storageRef = sref(storage, 'images/' + email);
        const profilePic = document.getElementById('pic');

        getDownloadURL(storageRef)
          .then((url) => {
            console.log('Download URL: ', url);
            profilePic.setAttribute('src', url);

          })
          .catch((error) => {
            console.error('Error retrieving image:', error);
          });






      } else {
        alert("No data found");
      }
    }).catch((error) => {
      alert(error);
    });


    



  } else {
    // User is signed out
    // ...
}
});




   