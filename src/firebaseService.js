import firebase from "firebase/app";
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
    // funzioni dei preferiti
    // la funzione richiede un parametro, il meal da inserire nel database dei preferiti, e ne prende l'id, il nome e l'immagine
    addToFavourites: async function (meal) {
        const id = meal.idMeal;
        meal.name = meal.strMeal; // nome del piatto
        meal.image = meal.strMealThumb; // immagine del piatto
        // creo un nuovo documento nella raccolta di favourites (db)
        return db
            .collection("favourites") // accedi alla collezione 'favourites'
            .doc(id) // tabella della collection (doc) riferita all'id
            .set(meal) // meal scelto come "favourite" da inserire
            .then(() => {
                console.log("Aggiunto ai preferiti");
                return meal;
            });
    },
    // qui il parametro è il meal da eliminare dall'elenco
    removeFromFavourites: async function (meal) {
        // rimuovo record usando l'id univoco
        const id = meal.idMeal;
        console.log(id)
        return db
            .collection("favourites")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Rimosso dai preferiti");
                return meal;
            });
    },
    // carica i favourites prendendoli dall'elenco
    getFavourites: async function () {
        // prendo tutti i favourites 
        const result = await db
            .collection("favourites")
            .get();
        const arrayFav = [];
        result.forEach((doc) => {
            // per ogni elemento (doc) di result metti nell'arrai i dati dei meals
            arrayFav.push(doc.data());
        });
        arrayFav.pop() // elimina l'ultimo elemento che è uno a caso che serviva per inizializzare la raccolta
        return arrayFav;
    }
};
