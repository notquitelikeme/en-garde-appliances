import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    FacebookAuthProvider, TwitterAuthProvider,
    signInWithPopup, onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCO209lhBLefKNqFDbvjZ6SGYfY8JrGE0",
    authDomain: "en-garde-appliances.firebaseapp.com",
    projectId: "en-garde-appliances",
    storageBucket: "en-garde-appliances.appspot.com",
    messagingSenderId: "99833960278",
    appId: "1:99833960278:web:70f7721d2ef4d6de58a8f7",
    measurementId: "G-82LC63MRME"
};

// init firebase app
initializeApp(firebaseConfig);
const auth = getAuth();
const facebookProvider = new FacebookAuthProvider();

const signInFacebook = document.getElementById("signInFacebook");
const signOutButton = document.getElementById("signOut");
const message = document.getElementById("message");
const userName = document.getElementById("userName");

signOutButton.style.display = "none";
message.style.display = "none";

const userSignIn = async () => {
signInWithPopup(auth, facebookProvider)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);

  });
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have signed out successfully!");
    }).catch((error) => { })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        signOutButton.style.display = "block";
        message.style.display = "block";
        userName.innerHTML = user.displayName
    } else {
        signOutButton.style.display = "none";
        message.style.display = "none";
    }
})

signInFacebook.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err)
        })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('the user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.signin')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in:', cred.user)
            loginForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })

})