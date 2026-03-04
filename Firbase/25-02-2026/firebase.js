 // Import the functions you need from the SDKs you need

//  import dotenv from "./dotenv.js";
//  dotenv.config();
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import {
    getAuth, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,

  } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyDgAn2TSlzeE_1LU6ohWg0Zan6y0JE7gpM",
    authDomain: "my-first-project-1242d.firebaseapp.com",
    projectId: "my-first-project-1242d",
    storageBucket: "my-first-project-1242d.firebasestorage.app",
    messagingSenderId: "995236133636",
    appId: "1:995236133636:web:0758573991e69527df2e51"
  };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
     const db = getFirestore(app); 
     export { app, db, getFirestore };
    //  const provider = new GoogleAuthProvider(); 
     export { auth, provider, GoogleAuthProvider };

 console.log("Firebase Initialized", app);
 const auth = getAuth(app);
 console.log("Firebase Auth Initialized", auth)

 var text = document.getElementById("text");

//   Signup 
 // action on Signup button
      var signupBtn = document.getElementById("signupBtn");
      signupBtn.addEventListener("click", singnup);
      // Login
      var signinBtn = document.getElementById("signinBtn");
      signinBtn.addEventListener("click", login);

      // Logout
      var logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", Logout)

      // Continue With Google
      var googleBtn = document.getElementById("googleBtn");
      googleBtn.addEventListener("click", google)
      

// On reload, check if user is already logged in
      onAuthStateChanged(auth, (user) => {
  if (user) {
    text.innerText = user.email;
  } else {
    text.innerText = "Not logged in";
  }
});

//  Singnup function
      function singnup() {
        var semail = document.getElementById("semail").value;
        var spassword = document.getElementById("spassword").value;
        
        createUserWithEmailAndPassword(auth, semail, spassword)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User", user);
    text.innerText = user.email;
    text.style.color = "green";
  })
  
  //  error handling
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error",errorMessage);
    text.innerText = errorMessage;
    text.style.color = "red";
  });

  }

  // Login function
   function login() {
        var lemail = document.getElementById("lemail").value;
        var lpassword = document.getElementById("lpassword").value;
        
        signInWithEmailAndPassword(auth, lemail, lpassword)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User", user);
    text.innerText = user.email;
    text.style.color = "green";
  })

  //  error handling
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error",errorMessage);
    text.innerText = errorMessage;
    text.style.color = "red";
  });
}

// Logout function
function Logout() {
  auth.signOut().then(() => {
    text.innerText = "Logged out successfully";
    text.style.color = "green";
  }).catch((error) => {
    console.log("Error", error);
    text.innerText = "Error logging out";
    text.style.color = "red";
  });
}

// Continue with Google function
const provider = new GoogleAuthProvider();
function google() {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("User", user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });


}


//  firestore database 
//  Auth -> authenticate (login/signup)
// Storage -> file upload/download(images, pdfs, etc)
//  Realtime Database -> real-time data sync (chat apps, live updates)