<template>
    <div>
        <navigation-by-letter></navigation-by-letter>
        <md-card-container class="md-layout md-gutter md-alignment-center">
            <router-link :to="randomMeal.idMeal">
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
        </md-card-container>

        <md-card-container class="row-two">
            <div v-for="meal in this.mealsList" :key="meal.idMeal">
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
</template>

<script>
import axiosApi from '@/axiosApi';
import NavigationByLetter from '@/components/NavigationByLetter.vue';

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
    },
    components: {
        NavigationByLetter
    }
}
</script>

<style >
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}

.row-two {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* align items horizontally in the center */
}
</style>