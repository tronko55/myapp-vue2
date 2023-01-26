<template>
    <div class="md-layout md-gutter md-alignment-center">
        <md-card class="md-card" md-with-hover>
            <md-card-media>
                <img :src="randomMeal.strMealThumb">
            </md-card-media>

            <md-card-header>
                <div class="md-title">{{ randomMeal.strMeal }}</div>
                <div class="md-subhead">{{ randomMeal.strCategory }}</div>
            </md-card-header>

            <md-card-expand>
                <md-card-actions md-alignment="space-between">
                    <div>
                        <md-button>Action</md-button>
                    </div>

                    <md-card-expand-trigger>
                        <md-button>Learn more</md-button>
                    </md-card-expand-trigger>
                </md-card-actions>

                <md-card-expand-content>
                    <md-card-content>
                        {{ randomMeal.strInstructions }}
                    </md-card-content>
                </md-card-expand-content>
            </md-card-expand>
        </md-card>

    </div>
</template>

<script>
import axiosApi from '@/axiosApi';


export default {

    data: function () {
        return {
            randomMeal: {}
        }

    },
    mounted: async function () {
        axiosApi.getRandomMeal().then((result) => {
            console.log(result.data);
            this.randomMeal = result.data.meals[0];
        });
    }
}
</script>

<style scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;

}
</style>