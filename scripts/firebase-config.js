
const firebaseConfig = {
  apiKey: "AIzaSyBkImcv_luqjVpl0F6JwD9eVjGXC_lz7Oc",
  authDomain: "my-e-commerce-app-4f8ec.firebaseapp.com",
  projectId: "my-e-commerce-app-4f8ec",
  storageBucket: "my-e-commerce-app-4f8ec.firebasestorage.app",
  messagingSenderId: "1038964820078",
  appId: "1:1038964820078:web:1413c1b12a57e08926fe7f",
  measurementId: "G-L23FH1VNCY"
};
// Initialize Firebase using the global 'firebase' object from the SDK script
firebase.initializeApp(firebaseConfig);

// Define the 'auth' variable so your other scripts can use it
const auth = firebase.auth();