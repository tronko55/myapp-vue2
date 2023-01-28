<template>

    <div class="md-layout md-gutter md-alignment-center">

        <div class="md-card" v-for="category in this.categories" :key="category.strCategory">
            <router-link :to="'/categories/' + category.strCategory">
                <md-card md-with-hover>
                    <md-card-media-cover md-text-scrim>
                        <md-card-media md-ratio="16/9">
                            <img :src="category.strCategoryThumb">
                        </md-card-media>

                        <md-card-area>
                            <md-card-header>
                                <span class="md-title">{{ category.strCategory }}</span>
                            </md-card-header>

                            <!-- <md-card-actions>
                            <md-button class="md-icon-button">
                                <md-icon>favorite</md-icon>
                            </md-button>

                        </md-card-actions> -->

                        </md-card-area>
                    </md-card-media-cover>
                </md-card>
            </router-link>
        </div>
    </div>
</template>
    
<script>
import axiosApi from '@/axiosApi';

export default {
    data: function () {
        return {
            categories: {},
        }
    },
    mounted: async function () {
        axiosApi.getMealsCategories().then((result) => {
            console.log(result.data.categories);
            this.categories = result.data.categories;
        });
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
</style>