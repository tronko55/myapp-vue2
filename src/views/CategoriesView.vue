<template>
    <div>
        <!-- come al solito mostra la barra di caricamento finché non finisce di caricare -->
        <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>

        <h5 class="title">Browse by Category</h5>
        <div class="md-layout md-gutter md-alignment-center">
            <div class="md-card" v-for="category in categories" :key="category.strCategory">
                <router-link :to="{ name: 'category', params: { category: category.strCategory } }">
                    <md-card md-with-hover>
                        <md-card-media-cover md-text-scrim>
                            <md-card-media md-ratio="16/9">
                                <img :src="category.strCategoryThumb">
                            </md-card-media>
                            <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{ category.strCategory }}</span>
                                </md-card-header>
                            </md-card-area>
                        </md-card-media-cover>
                    </md-card>
                </router-link>
            </div>
        </div>

    </div>
</template>
    
<script>
import axiosApi from '@/axiosApi';

export default {
    data: function () {
        return {
            categories: {},
            mealsList: [],
            loading: true
        }
    },
    mounted: function () {
        axiosApi.getMealsCategories().then((result) => {
            console.log(result.data.categories);
            this.categories = result.data.categories;
            this.loading = false
        });
    },

}
</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

}
</style>