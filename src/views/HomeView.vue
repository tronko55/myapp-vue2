<template>
    <div>
        <!-- la barra di stato prende il parametro loading: quando è falso non viene visualizzato -->
        <md-progress-bar v-if="this.loading" class="md-accent" md-mode="query"></md-progress-bar>
        <!-- viene visto il componente navigazione per lettera e lega la componente lettera a due vie -->
        <navigation-by-letter v-model="letter"></navigation-by-letter>
        <!-- container con una carta con un random meal -->
        <md-card-container class="md-layout md-gutter md-alignment-center">
            <!-- il router rimanda al meal della carta -->
            <router-link :to="{ name: 'meal', params: { id: randomMeal.idMeal } }">
                <md-card class="md-card" md-with-hover>
                    <md-card-media>
                        <img :src="randomMeal.strMealThumb">
                    </md-card-media>
                    <md-card-header>
                        <div class="md-title">{{ randomMeal.strMeal }}</div>
                        <div class="md-subhead">{{ randomMeal.strCategory }}</div>
                    </md-card-header>

                    <md-card-actions>
                        <md-button @click.prevent>
                            <!-- <md-icon v-if="isFavorite(meal) === -1">bookmark_add</md-icon> -->
                            <md-icon>bookmark_add </md-icon>
                        </md-button>
                        <md-button>Read more</md-button>
                    </md-card-actions>
                </md-card></router-link>
        </md-card-container>

        <md-card-container class="row-two">
            <!-- se la lista è vuota allora visualizza il componente empty state -->
            <empty-state-vue v-if="this.mealsList === null"></empty-state-vue>
            <!-- visualizza tutti i pasti con quella lettera -->
            <div v-for="meal in this.mealsList" :key="meal.idMeal">
                <!-- il router rimanda al meal della carta -->
                <router-link :to="{ name: 'meal', params: { id: meal.idMeal } }">
                    <md-card class="md-card" md-with-hover>
                        <md-card-media>
                            <img :src="meal.strMealThumb" />
                        </md-card-media>
                        <md-card-header>
                            <div class="md-title">{{ meal.strMeal }}</div>
                            <div class="md-subhead">{{ meal.strCategory }}</div>
                        </md-card-header>
                        <md-card-actions>
                            <md-button @click.prevent="addToFavourites(meal.idMeal)">
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
import EmptyStateVue from '@/components/EmptyState.vue';

import firebaseService from '@/firebaseService';

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
    // al cambio del parametro (in questo caso lettera) esegui di nuovo la funzione con un nuovo parametro
    watch: {
        '$route.params.letter': function (newLetter,) {
            this.loadCards(newLetter)
        },
    },
    mounted: function () {
        this.loading = true;
        axiosApi.getRandomMeal().then((result) => {
            console.log(result.data);
            this.randomMeal = result.data.meals[0];
            this.loading = false;
        });
        this.loadCards(this.$route.params.letter);
        // firebaseService.getFavorites().then((favs) => {
        //     // promise
        //     this.favorites = favs;
        // })
    },
    methods: {
        // la funzione carica le carte da visualizzare nella pagina; come parametro vuole la lettera che seleziona l'utente
        loadCards: function (letter) {
            this.loading = true
            axiosApi.getByLetter(letter).then((result) => {
                console.log(result.data);
                this.mealsList = result.data.meals
                this.loading = false;
            });
        },
        addToFavourites(meal) {
            this.loading = true;
            firebaseService
                .addToFavourites(meal)
                .then(() => {
                    this.loading = false;
                })
                .catch((error) => {
                    console.error(error);
                    this.loading = false;
                });

        }
    },
    // componenti utilizzati in questa pagina
    components: {
        NavigationByLetter,
        EmptyStateVue
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