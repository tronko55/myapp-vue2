import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfSgQ_bvkhubHtNQMpAmiD96CVP1LUCNQ",
    authDomain: "info2023-5aa5b.firebaseapp.com",
    projectId: "info2023-5aa5b",
    storageBucket: "info2023-5aa5b.appspot.com",
    messagingSenderId: "304857663343",
    appId: "1:304857663343:web:8c6762762e5018414fca9a"
};

// qui dentro tutte le funzioni per il manage di dati nel database
export default {
    login: function (username) {
        // il parametro inserito serve per distinguere i preferiti dell'utente locale
        // inserisco utente nel localstorage
        localStorage.setItem("user", username);
    },
    logout: function () {
        // elimino utente dal localstorage
        localStorage.removeItem("user");
    },
    isAuthenticated: function () {
        // controllo che l'utente sia nel localstorage
        return localStorage.getItem("user") != null;
    },
    getUsername: function () {
        // ritorno l'utente
        return localStorage.getItem("user");
    },
    // funzioni dei preferiti
    addToFavorites: function (meal) {
        // meal da inserire nel db dei preferiti
        // creo un nuovo record (riga nella tabella db) nei favorites (db)
        /*
          meal => {id, user, name, image}
        */
        const id = this.getUsername() + "-" + meal.idMeal; // costruisco id univoco = username-idMeal
        meal.user = this.getUsername();
        meal.name = meal.strMeal; // nome del piatto
        meal.image = meal.strMealThumb; // immagine del piatto
        return db
            .collection("favorites") // collezione del db (favorites)
            .doc(id) // tabella della collection (doc) riferita all'id
            .set(meal) // drink scelto come "favorite" da inserire
            .then(() => {
                console.log("Aggiunto ai preferiti");
                return meal; // da passare alla funzione addtofavorites in Favorites.vue
            });
    },
    removeFromFavorites: function (meal) {
        // param: meal --> meal da eliminare
        // rimuovo record usando l'id univoco
        const id = this.getUsername() + "-" + meal.id.Meal;
        return db
            .collection("favorites")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Rimosso dai preferiti");
                return meal;
            });
    },
    getFavorites: function () {
        // prendo tutti i favorites di un utente
        return db
            .collection("favorites")
            .where("user", "==", this.getUsername())
            .get()
            .then((result) => {
                const arrayFav = [];
                result.forEach((doc) => {
                    // per ogni elemento (doc) di result
                    arrayFav.push(doc.data());
                });
                return arrayFav; // passo al mounted in Favorites.vue un vettore con tutti i preferiti
            });
    }
};
