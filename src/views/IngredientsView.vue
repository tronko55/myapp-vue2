<!-- In questo template invece non visualizzo gli elementi in modo coerente con le categorie, 
    ma siccome non vedo le immagini allora ha bisogno di meno tempo per caricare e posso usare i filtri su una lista di tutti gli ingredienti -->
<template>
    <div>
        <div>
            <h1 class="title">Ingredients</h1>

            <div class="search">
                <md-input type="text" v-model="keyword" placeholder="Search for Ingredients">
                </md-input>
            </div>
        </div>
        <div class="card-container">
            <md-card class="card" md-with-hover v-for="ingredient in filteredIngredients"
                :key="ingredient.strIngredient">
                <md-ripple>
                    <router-link :to="{ name: 'ingredient', params: { ingredient: ingredient.strIngredient } }">
                        <md-card-header>
                            <div class="md-title">{{
                                ingredient.strIngredient
                            }}</div>
                        </md-card-header>
                    </router-link>
                </md-ripple>
            </md-card>
        </div>
    </div>
</template>


<script>
import axiosApi from '@/axiosApi';

export default {
    data() {
        return {
            keyword: "",
            ingredients: [],
            loading: true,
        }
    },
    computed: {
        filteredIngredients() {
            return this.ingredients.filter(i =>
                i.strIngredient.toLowerCase().includes(this.keyword.toLowerCase())
            );
        }
    },
    mounted: function () {

        axiosApi.getIngredients().then(({ data }) => {
            this.ingredients = data.meals;
            console.log(this.ingredients)
        })
    }
}
</script>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: calc(33.33% - 8px);
    margin: 4px;
}

@media (max-width: 720px) {
    .card {
        width: calc(50% - 8px);
    }
}

@media (max-width: 480px) {
    .card {
        width: 100%;
    }
}
</style>
<!-- con questo codice visualizzo venti elementi per volta ed ho un bottone per caricarne di più.
non ho quindi integrato il filtro -->

<!-- <template>
    <div>
        <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
        <div>
            <h1>Ingredients</h1>
        </div>

        <div class="md-layout md-gutter md-alignment-center">

            <div class="md-card" v-for="ingredient in ingredients.slice(0, limit)" :key="ingredient.strIngredient">
                <router-link :to="{ name: 'ingredient', params: { ingredient: ingredient.strIngredient } }">
                    <md-card md-with-hover>
                        <md-card-media-cover md-text-scrim>
                            <md-card-media md-ratio="16/9">
                                <img
                                    :src="'https://www.themealdb.com/images/ingredients/' + ingredient.strIngredient + '.png'">
                            </md-card-media>

                            <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{ ingredient.strIngredient }}</span>
                                </md-card-header>
                            </md-card-area>
                        </md-card-media-cover>
                    </md-card>
                </router-link>
            </div>
        </div>
        <div>
            <md-button class="md-raised md-primary" @click="loadMore">Load More</md-button>
        </div>
    </div>
</template>

<script>
import axiosApi from '@/axiosApi';

export default {
    data() {
        return {
            keyword: "",
            ingredients: [],
            loading: true,
            limit: 20
        }
    },
    methods: {
        loadMore: function () {
            this.limit += 20;
            this.loadCards()

        },
        loadCards: function () {
            axiosApi.getIngredients().then(({ data }) => {
                console.log(data);
                this.ingredients = data.meals.slice(0, this.limit);
                this.loading = false;
            });
        }
    },
    mounted: function () {
        this.loadCards()
    }
}
</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

}
</style> -->