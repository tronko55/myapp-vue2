import axios from "axios";


export default {

    // prendi dall'api l'array di meals
    getMealsCategories: function () {
        return axios.get('https://www.themealdb.com/api/json/v1/1/categories.php', {
            params: {
                a: "categories.php"
            }
        })
    },

}


