import axios from "axios";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
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
    /**
     *
     * Si usa una Promise di Ajax poiché non posso accedere direttamente ai dati
     * Restituisce la lista delle canzoni in base alla ricerca effettuata.
     * @param str è il target di ricerca
     * @param tmp è la posizione in cui deve partire per inserire le canzoni, utile per il LoadMore
     * @param n è il numero di elementi per pagina
     */
    getSongs: function (str, tmp, n) {
        return axios
            .get(this.eseguiRichiesta(str, n))

            .then((result) => {
                let stringify = result.data.response.hits;

                // array di risultato
                const array = [];
                for (let i = tmp; i < stringify.length; i++) {
                    let song = stringify[i].result;

                    array.push(song);
                }
                return array;
            });
    },

    //Ottiene singola canzone
    getSong: function (id) {
        return axios
            .get(this.eseguiRichiesta(id, 10))
            .then((result) => result.data.response.hits[0].result);
    },

    //Operazione di login
    login: function (username) {
        localStorage.setItem("musicality_username", username); //local storage salva i dati un file del browser (firefox usa un sql)
    },
    logout: function () {
        //Operazione di logout
        console.log("Disconnesso");
        localStorage.removeItem("musicality_username");
    },
    isAuthenticated: function () {
        return !!localStorage.getItem("musicality_username"); //!! = scorciatoia per dichiarare una variabile booleana
    },
    getUsername: function () {
        return localStorage.getItem("musicality_username");
    },

    //Aggiungi ai preferiti
    addToFavorites: function (song) {
        const id = this.getUsername() + "-" + song.id;
        song.user = this.getUsername();
        return db
            .collection("favorites")
            .doc(id)
            .set(song)
            .then(() => {
                console.log("Salvato");
                return song;
            });
    },
    removeFromFavorites: function (song) {
        const id = this.getUsername() + "-" + song.id;
        return db
            .collection("favorites")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Eliminato");
                return song;
            });
    },
    getFavorites: function () {
        return db
            .collection("favorites")
            .where("user", "==", this.getUsername()) //poiché +è per inizializzare la lista, non ho ancora song o id da usare
            .get()
            .then((result) => {
                const array = [];
                result.forEach((doc) => {
                    array.push(doc.data());
                });
                return array;
            });
    },
    rateSong: function (song, value) {
        const id = this.getUsername() + "-" + song.id;
        return db
            .collection("ratings")
            .doc(id)
            .set({
                songId: song.id,
                user: this.getUsername(),
                value: value
            })
            .then((result) => {
                return value;
            });
    },
    getSongRatingData: function (song) {
        return db
            .collection("ratings")
            .where("songId", "==", song.id)
            .get()
            .then((result) => {
                const ratingData = { myRating: 0, average: 0, count: 0 };
                result.forEach((doc) => {
                    const data = doc.data();
                    if (data.user === this.getUsername()) {
                        ratingData.myRating = data.value;
                    }
                    ratingData.average += data.value;
                });
                if (result.size > 0) {
                    ratingData.average = ratingData.average / result.size;
                    ratingData.count = result.size;
                }
                return ratingData;
            });
    },

    addToHistory: function (song) {
        const id = this.getUsername() + "-" + song.id;
        song.user = this.getUsername();
        return db
            .collection("history")
            .doc(id)
            .set(song)
            .then(() => {
                console.log("Salvato in cronologia");
                return song;
            });
    },

    getHistory: function () {
        return db
            .collection("history")
            .where("user", "==", this.getUsername())
            .get()
            .then((result) => {
                const array = [];
                result.forEach((doc) => {
                    array.push(doc.data());
                });
                return array;
            });
    },
    removeFromHistory: function (song) {
        const id = this.getUsername() + "-" + song.id;
        return db
            .collection("history")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Eliminato da cronologia");
                return song;
            });
    }
};
