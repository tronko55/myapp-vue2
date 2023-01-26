<template>

    <div>
        Pagina delle categorie

        <div v-for="category in this.categories" :key="category.idCategory">
            <md-card>
                <md-card-media-cover md-solid>
                    <md-card-media md-ratio="1:1">
                        <img :src="category.strCategoryThumb">
                    </md-card-media>

                    <md-card-area>
                        <md-card-header>
                            <span class="md-title">{{ category.strCategory }}</span>
                            <span class="md-subhead">{{ category.idCategory }}</span>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button">
                                <md-icon>favorite</md-icon>
                            </md-button>

                            <md-button class="md-icon-button">
                                <md-icon>share</md-icon>
                            </md-button>
                        </md-card-actions>
                    </md-card-area>
                </md-card-media-cover>
            </md-card>
        </div>

    </div>


</template>
    
<script>
import axiosApi from '@/axiosApi';
// import MealCardVue from '@/components/MealCard.vue';
// import MealCard from '@/components/MealCard.vue';

// const categories = ([]);
export default {
    data: function () {
        return {
            categories: [],
        }

    },
    mounted: async function () {
        // const categories = await axiosApi.getMealsCategories()
        // console.log(categories.data)

        axiosApi.getMealsCategories().then((result) => {
            console.log(result.data.categories);
            this.categories = result.data.categories;
        });
    },
    components: {
        // MealCard
    }
}
</script>

<style>

</style>