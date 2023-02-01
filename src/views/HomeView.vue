<template>
    <div>
        <!-- la barra di stato prende il parametro loading: quando è falso non viene visualizzato -->
        <md-progress-bar v-if="this.loading" class="md-accent" md-mode="query"></md-progress-bar>
        <div>
            <h5 class="title">Get ispired</h5>
            <!-- carta con un random meal -->
            <card-component :meal="randomMeal" :key="randomMeal.idMeal"
                class="md-layout md-gutter md-alignment-center" />
        </div>

        <div>
            <h5 class="title">Browse by first letter</h5>
            <!-- viene visto il componente navigazione per lettera e lega la componente lettera a due vie -->
            <navigation-by-letter v-model="letter"></navigation-by-letter>


            <!-- sezione con i piatti per lettera -->
            <div class="row-two ">
                <!-- se la lista è vuota allora visualizza il componente empty state -->
                <empty-state-vue v-if="this.mealsList === null"></empty-state-vue>
                <!-- visualizza tutti i pasti con quella lettera -->
                <card-component v-for="meal in mealsList" :meal="meal" :key="meal.idMeal" />
            </div>
        </div>
    </div>
</template>

<script>
import axiosApi from '@/axiosApi';

import NavigationByLetter from '@/components/NavigationByLetter.vue';
import EmptyStateVue from '@/components/EmptyState.vue';
import CardComponent from '@/components/CardComponent.vue';

export default {
    data: function () {
        return {
            randomMeal: {},
            mealsList: [],
            loading: false,
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
        }
    },
    // componenti utilizzati in questa pagina
    components: {
        NavigationByLetter,
        EmptyStateVue,
        CardComponent
    }
}
</script>

<style>
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

.title {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    margin-top: 0;
    margin-bottom: 0rem;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.2;
    text-align: center;
}
</style>