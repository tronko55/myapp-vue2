<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div>
            <router-link :to="'/meal/' + randomMeal.idMeal">
                <md-card class="md-card" md-with-hover to="/">

                    <md-card-media>
                        <img :src="randomMeal.strMealThumb">
                    </md-card-media>

                    <md-card-header>
                        <div class="md-title">{{ randomMeal.strMeal }}</div>
                        <div class="md-subhead">{{ randomMeal.strCategory }}</div>
                    </md-card-header>


                    <md-card-actions>
                        <md-button @click.prevent>
                            <md-icon>bookmark_add</md-icon>
                        </md-button>
                        <md-button>Read more</md-button>
                    </md-card-actions>

                </md-card></router-link>
        </div>

        <div class="md-layout-item md-gutter md-alignment-center">

            <div v-for="meal in this.mealsList" :key="meal.idMeal"
                class="item-container md-layout-item md-xlarge-size-20 md-large-size-20 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                <router-link :to="'/meal/' + meal.idMeal">
                    <!-- /drink/id da inviare a drink.vue -->
                    <md-card>
                        <md-card-media-cover md-solid>
                            <md-card-media>
                                <img :src="meal.strMealThumb" />
                            </md-card-media>

                            <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{ meal.strMeal }}</span>
                                </md-card-header>
                                <md-card-actions>
                                    <md-button class="md-icon-button" @click.prevent>
                                        <md-icon>
                                            <span class="material-symbols-outlined">
                                                bookmark_add
                                            </span>

                                        </md-icon>
                                    </md-button>
                                </md-card-actions>
                            </md-card-area>
                        </md-card-media-cover>
                    </md-card></router-link>
            </div>
        </div>

    </div>
</template>

<script>
import axiosApi from '@/axiosApi';


export default {

    data: function () {
        return {
            randomMeal: {},
            mealsList: []
        }

    },
    mounted: function () {
        axiosApi.getRandomMeal().then((result) => {
            console.log(result.data);
            this.randomMeal = result.data.meals[0];
        });
        axiosApi.getByLetter('a').then((result) => {
            console.log(result.data);
            this.mealsList = result.data.meals
        });


    },
    methods: {
        // carica: function () {


        //     axiosApi.getMeals().then((result) => {
        //         // promise
        //         // prendo tutti quelli alcolici
        //         this.mealsList = result.data.meals;
        //         // this.loading = false;
        //     })
        // }

        // methods: {
        //     getMealsList: function (tmp) {
        //         return axiosApi
        //             .getMeals()

        //             .then((result) => {
        //                 let mealsList = result.data.response.hits;

        //                 // array di risultato
        //                 const array = [];
        //                 for (let i = tmp; i < mealsList.length; i++) {
        //                     let meal = mealsList[i].result;

        //                     array.push(meal);
        //                 }
        //                 return array;
        //             })
        //     }
        // }
    }
}
</script>

<style scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

}
</style>