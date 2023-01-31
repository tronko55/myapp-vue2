import firebase from "firebase/app";
// import firebase and its proprierties directly
// import * as firebase from 'firebase/app';

import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfSgQ_bvkhubHtNQMpAmiD96CVP1LUCNQ",
    authDomain: "info2023-5aa5b.firebaseapp.com",
    projectId: "info2023-5aa5b",
    storageBucket: "info2023-5aa5b.appspot.com",
    messagingSenderId: "304857663343",
    appId: "1:304857663343:web:8c6762762e5018414fca9a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// qui dentro tutte le funzioni per il manage di dati nel database
export default {
    // login: function (username) {
    //     // il parametro inserito serve per distinguere i preferiti dell'utente locale
    //     // inserisco utente nel localstorage
    //     localStorage.setItem("user", username);
    // },
    // logout: function () {
    //     // elimino utente dal localstorage
    //     localStorage.removeItem("user");
    // },
    // isAuthenticated: function () {
    //     // controllo che l'utente sia nel localstorage
    //     return localStorage.getItem("user") != null;
    // },
    // getUsername: function () {
    //     // ritorno l'utente
    //     return localStorage.getItem("user");
    // },
    // funzioni dei preferiti
    addToFavourites: async function (meal) {
        // meal da inserire nel db dei preferiti
        // creo un nuovo record (riga nella tabella db) nei favorites (db)
        /*
          meal => {id, user, name, image}
        */
        const id = meal.id;
        meal.name = meal.strMeal; // nome del piatto
        meal.image = meal.strMealThumb; // immagine del piatto
        return db
            .collection("favourites") // collezione del db (favourites)
            .doc(id) // tabella della collection (doc) riferita all'id
            .set(meal) // meal scelto come "favourite" da inserire
            .then(() => {
                console.log("Aggiunto ai preferiti");
                return meal; // da passare alla funzione addtofavourites in Favourites.vue
            });
    },
    removeFromFavourites: async function (meal) {
        // param: meal --> meal da eliminare
        // rimuovo record usando l'id univoco
        const id = meal.id;
        return db
            .collection("favourites")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Rimosso dai preferiti");
                return meal;
            });
    },
    getFavourites: async function () {
        // prendo tutti i favorites di un utente
        const result = await db
            .collection("favourites")
            .get();
        const arrayFav = [];
        result.forEach((doc) => {
            // per ogni elemento (doc) di result
            arrayFav.push(doc.data());
        });
        return arrayFav;
    }
};
