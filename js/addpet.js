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







auth.onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;

        const dbref = ref(database);
        get(child(dbref, "users/" + uid)).then((snapshot) => {
            if (snapshot.exists()) {
                var result = snapshot.val();
                var fullname = result.fullname;
                var email = result.email
                var number = result.number
                var password = result.password
               
                console.log(fullname)
                console.log(email)
                console.log(number)
                console.log(password)
              
               
                // Add Image
                const imageFileInput = document.getElementById("image");
                const submit = document.getElementById("submit")
                const submitData = document.getElementById("submitData")
                submitData.addEventListener('click', (e) => {
                    const name = document.getElementById("name").value
                    console.log(name)
                    const breed = document.getElementById('breed').value;
                    const description = document.getElementById('description').value
                    set(ref(database, `pets/${description+name}`), {
                        name: name,
                        breed : breed,
                        description : description,
                  
                        
                    })
                    .then(() => {
                        // Data saved successfully!
                      //   alert('user created successfully');
                      //   location.href="profile.html"
          
                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
        
            })









                imageFileInput.addEventListener("change", (event) => {
                    const name = document.getElementById("name").value
               
                    const breed = document.getElementById('breed').value;
                    const description = document.getElementById('description').value

                    const file = event.target.files[0];

                    // const storageRef = sref(storage, `images/${file.name}`);
                    const storageRef = sref(storage, `pets/${description+name}`);

                    const uploadTask = uploadBytes(storageRef, file);
                    submit.addEventListener("click", (e) => {
                        uploadTask.then((snapshot) => {
                            alert("Image uploaded successfully!");
                            return getDownloadURL(snapshot.sref);
                        })
                            .then((downloadURL) => {
                                alert(`Download URL: ${downloadURL}`);
                                // Use the download URL as needed
                            })
                            .catch((error) => {
                                console.error("Error uploading image:", error);
                            });
                        

                    })

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
















