<template>
    <div>
        filtra per categoria
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
import axiosApi from "../axiosApi";

export default {
    name: "MealByCategory",
    data: function () {
        return {
            mealsList: {},
            category: null
        };
    },
    mounted: function () {
        console.log("categoryPath: " + this.$route.params.category);
        this.category = this.$route.params.category.split('/')[1];
        console.log(this.category);
        axiosApi.getByCategory(this.category).then((result) => {
            console.log(result.data);
            this.mealsList = result.data.meals
        });

    }
}

</script>

<style>

</style>