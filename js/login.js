// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";



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

login.addEventListener('click', (e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
 
  

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
      // Signed in
      const user = userCredential.user;
      // ...

      // save log in details into real time database
      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
          last_login: lgDate,
      })
          .then(() => {
              // Data saved successfully!
              
              location.href = "profile.html"

          })
          .catch((error) => {
              // The write failed...
              alert(error);
          });
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
  });




 
});