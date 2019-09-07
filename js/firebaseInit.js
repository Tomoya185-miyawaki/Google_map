// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7zTcn-O8m80D5ccbvvR756gFRV6IJy8U",
  authDomain: "samplemap-252008.firebaseapp.com",
  databaseURL: "https://samplemap-252008.firebaseio.com",
  projectId: "samplemap-252008",
  storageBucket: "",
  messagingSenderId: "789819885629",
  appId: "1:789819885629:web:ef5464ab58f2e4caa50254"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
db = firebase.firestore(app);