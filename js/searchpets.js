
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
const pets = []

auth.onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;

        const dbref = ref(database);
        const petCardsContainer = document.querySelector('.pet-cards');
        get(child(dbref, "pets")).then((snapshot) => {
            if (snapshot.exists()) {

                snapshot.forEach((childSnapshot) => {
                    const objectName = childSnapshot.key;
                    const { name, breed, description } = childSnapshot.val();
                    // console.log(`Object Name: ${objectName}`);
                    // console.log(`Name: ${name}`);
                    // console.log(`Breed: ${breed}`);
                    // console.log(`Description: ${description}`);
                    pets.push({objectName,name,breed,description})
                    
                    
                  });
                  const petCardsContainer = document.querySelector('.pet-cards');

                  for (let i = 0; i < pets.length; i++) {
                    //--------------------------------------------------------
                    const storageRef = sref(storage, 'pets/'+pets[i].description+pets[i].name);
                    
                     
                    
    


                    //--------------------------------------------------------
                    const petImg = document.createElement('div');
                    getDownloadURL(storageRef)
                        .then((url) => {
                            console.log('Download URL: ', url);
                            // Pic.setAttribute('src', url);
                            
                            petImg.classList.add('pet-img');
                            const img = document.createElement('img');
                      
                            img.src = url;
                            petImg.appendChild(img);
                            
                        }).catch((error) => {
                            console.error('Error retrieving image:', error);
                        });
                      const petCard = document.createElement('div');
                      petCard.classList.add('pet-card');
                  
                      
                  
                      const petInfo = document.createElement('div');
                      petInfo.classList.add('pet-info');
                      const name = document.createElement('h2');
                      name.textContent = pets[i].name;
                      const breed = document.createElement('p');
                      breed.textContent = `Breed: ${pets[i].breed}`;
                      const description = document.createElement('p');
                      description.textContent = `Description: ${pets[i].description}`;
                      petInfo.appendChild(name);
                      petInfo.appendChild(breed);
                      petInfo.appendChild(description);
                  
                      const icon = document.createElement('div');
                      icon.classList.add('icon');
                      const iElement = document.createElement('i');
                      iElement.classList.add('fa-solid', 'fa-mars');
                      iElement.style.color = '#ffffff';
                      icon.appendChild(iElement);
                  
                      petCard.appendChild(petImg);
                      petCard.appendChild(petInfo);
                      petCard.appendChild(icon);
                  
                      petCardsContainer.appendChild(petCard);
                  }
                  


            //------------------------------------------
            // if (snapshot.exists()) {
            //     const pets = snapshot.val();
            
            //     // Iterate over each pet in the pets object
            //     for (const petKey in pets) {
            //       const pet = pets[petKey];
            
            //       // Create a new pet card element
            //       const petCard = document.createElement('div');
            //       petCard.classList.add('pet-card');
            
            //       // Create a pet image element
            //       const petImg = document.createElement('div');
            //       petImg.classList.add('pet-img');
            //       const img = document.createElement('img');
            //       const storageRef = ref(storage, `pets/${pet.description}${pet.name}`);
            //       console.log(pet.description)
            //       getDownloadURL(storageRef).then(url => {
            //         img.src = url;
            //       });
            //       petImg.appendChild(img);
            
            //       // Create a pet info element
            //       const petInfo = document.createElement('div');
            //       petInfo.classList.add('pet-info');
            //       const name = document.createElement('h2');
            //       name.textContent = pet.name;
            //       const breed = document.createElement('p');
            //       breed.textContent = `Breed: ${pet.breed}`;
            //       const description = document.createElement('p');
            //       description.textContent = `Description: ${pet.description}`;
            //       petInfo.appendChild(name);
            //       petInfo.appendChild(breed);
            //       petInfo.appendChild(description);
            
            //       // Create an icon element
            //       const icon = document.createElement('div');
            //       icon.classList.add('icon');
            //       const i = document.createElement('i');
            //       i.classList.add('fa-solid', 'fa-mars');
            //       i.style.color = '#ffffff';
            //       icon.appendChild(i);
            
            //       // Add all elements to the pet card
            //       petCard.appendChild(petImg);
            //       petCard.appendChild(petInfo);
            //       petCard.appendChild(icon);
            
            //       // Add the pet card to the pet cards container
            //       petCardsContainer.appendChild(petCard);
            //     }
            //------------------------------
                 //var result = snapshot.val();
                // console.log(result)
                // const valueName = Object.keys(result)[1];
                // console.log(valueName);
                

                // const storageRef = sref(storage, 'pets/'+ valueName);
                // const Pic = document.getElementById('pic');

                // getDownloadURL(storageRef)
                //     .then((url) => {
                //         console.log('Download URL: ', url);
                //         Pic.setAttribute('src', url);
                        
                //     })
                //     .catch((error) => {
                //         console.error('Error retrieving image:', error);
                //     });
                

    





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


const locationSpan = document.getElementById("loc")


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = "53c8b1790a944c158eae5f492eb71c07"; // Replace with your actual API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.results[0].formatted;
        locationSpan.textContent = location;
        console.log(location)
      })
      .catch(error => console.log(error));
  });
} else {
  locationSpan.textContent = "Geolocation is not supported by this browser.";
}
