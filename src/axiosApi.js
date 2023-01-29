import axios from "axios";

export default {
    // prendi dall'api l'array di categorie
    getMealsCategories: function () {
        return axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    },
    // per filtrare in base alla categoria
    getByCategory: function (category) {
        return axios.get("https://www.themealdb.com/api/json/v1/1/filter.php", {
            params: {
                c: category
            }
        })
    },
    // prende un pasto a caso
    getRandomMeal: function () {
        return axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    },
    // per filtrare in base alla lettera
    getByLetter: function (letter) {
        return axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
            params: {
                f: letter
            }
        })
    },
    // per prendere i dettagli dei singoli pasti in base all'id
    getMealDetails: function (id) {
        return axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php', {
            params: {
                i: id
            }
        })
    }

}


