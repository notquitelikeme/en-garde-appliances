import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile
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

const signOutButton = document.getElementById("signOut");
const message = document.getElementById("message");
const userName = document.getElementById("userName");

signOutButton.style.display = "none";
message.style.display = "none";

// signing users up


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