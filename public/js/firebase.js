  // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyAxHouHAcoHKXESd3Vvzyrbkq3G5XaCW_s",
        authDomain: "fb-auth-d1906.firebaseapp.com",
        databaseURL: "https://fb-auth-d1906-default-rtdb.firebaseio.com",
        projectId: "fb-auth-d1906",
        storageBucket: "fb-auth-d1906.appspot.com",
        messagingSenderId: "292078384734",
        appId: "1:292078384734:web:1cf5d23a0fee54aecd26cf",
        measurementId: "G-YVWMX9G7XP",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();
      const fs = firebase.firestore();
      firebase.analytics();