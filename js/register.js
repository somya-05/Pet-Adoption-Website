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

submitData.addEventListener('click', (e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var fullname = document.getElementById("fullname").value
  var email = document.getElementById("email").value
  var number = document.getElementById("number").value
  var confirmpassword = document.getElementById("confirmpassword").value
  
  if (!validate_field(fullname)){
    alert("Enter fullname")
    return
  }
  
  if (!validate_field(email)){
    alert("Enter password")
    return
  }
  if (!validate_field(number)){
    alert("Enter number")
    return
  }

  if (!validate_field(password)){
    alert("Enter password")
    return
  }
  if (!validate_email(email)){
    alert("weak email")
    return
  }

  if(password != confirmpassword){
    alert("passwords dont match")
  }




 
  //sign up user
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ... user.uid
          set(ref(database, 'users/' + user.uid), {
              email: email,
              fullname : fullname,
              number : number,
              password : password


          })
              .then(() => {
                  // Data saved successfully!
                  alert('user created successfully');
                  location.href="profile.html"
  
              })
              .catch((error) => {
                  // The write failed...
                  alert(error);
              });
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorMessage);
      });



 
});


function validate_email(email){
const expression = /^[^@]+@\w+(\.\w+)+\w$/

if (expression.test(email)==true){
    return true
} else {
    return false
}
}

function validate_field(field){
    if (field == null || field .length == 0) {
        return false
    } else {
        return true
    }
    
}

