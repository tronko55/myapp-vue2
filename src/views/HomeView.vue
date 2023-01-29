<template>
    <div>
        <md-progress-bar v-if="this.loading" class="md-accent" md-mode="query"></md-progress-bar>
        <navigation-by-letter v-model="letter"></navigation-by-letter>
        <md-card-container class="md-layout md-gutter md-alignment-center">
            <router-link :to="{ name: 'meal', params: { id: randomMeal.idMeal } }">
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
                <router-link :to="{ name: 'meal', params: { id: meal.idMeal } }">
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
            mealsList: [],
            loading: false,
            favorites: [],
            letter: ''
        }

    },
    watch: {
        letter: 'loadCards'
    },
    mounted: function () {
        this.loading = true;
        this.loadCards();
    },
    methods: {
        loadCards: function () {
            this.loading = true
            axiosApi.getRandomMeal().then((result) => {
                console.log(result.data);
                this.randomMeal = result.data.meals[0];
                this.loading = false;
            });
            axiosApi.getByLetter('s').then((result) => {
                console.log(result.data);
                this.mealsList = result.data.meals
                this.loading = false;
            });
        }
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