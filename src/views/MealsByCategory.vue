<template>
    <div>
        <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
        filtra per categoria

        <div class="md-layout-item md-gutter md-alignment-center">

            <md-card-container class="row-two">
                <div v-for="meal in mealsList" :key="meal.idMeal">
                    <router-link :to="meal.idMeal">
                        <md-card class="md-card" md-with-hover to="/">
                            <md-card-media>
                                <img :src="meal.strMealThumb" />
                            </md-card-media>
                            <md-card-header>
                                <div class="md-title">{{ meal.strMeal }}</div>
                                <div class="md-subhead">{{ meal.strCategory }}</div>
                            </md-card-header>
                            <md-card-actions>
                                <md-button @click.prevent>
                                    <md-icon>bookmark_add</md-icon>
                                </md-button>
                                <md-button>Read more</md-button>
                            </md-card-actions>
                        </md-card>
                    </router-link>
                </div>
            </md-card-container>

        </div>
    </div>
</template>

<script>
import axiosApi from "../axiosApi";

export default {
    name: "MealsByCategory",
    data: function () {
        return {
            mealsList: {},
            category: null,
            loading: true
        };
    },
    mounted: function () {
        console.log("categoryPath: " + this.$route.params.category);
        this.category = this.$route.params.category;
        console.log(this.category);
        axiosApi.getByCategory(this.category).then((result) => {
            console.log(result.data);
            this.mealsList = result.data.meals
            this.loading = false
        });

    }
}

</script>

<style>

</style>