<template>
    <div>
        <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
        filtra per categoria

        <div class="row-two">
            <!-- visualizza tutti i pasti con quella lettera -->
            <card-component v-for="meal in mealsList" :meal="meal" :key="meal.idMeal" />

        </div>
    </div>
</template>

<script>
import axiosApi from "../axiosApi";
import CardComponent from '@/components/CardComponent.vue';


export default {
    name: "MealsByCategory",
    data: function () {
        return {
            mealsList: {},
            category: null,
            loading: true
        };
    },
    mounted: function () {
        console.log("categoryPath: " + this.$route.params.category);
        this.category = this.$route.params.category;
        console.log(this.category);
        axiosApi.getByCategory(this.category).then((result) => {
            console.log(result.data);
            this.mealsList = result.data.meals
            this.loading = false
        });

    },
    components: {
        CardComponent
    }
}

</script>

<style>

</style>