<template>
    <div>
        <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
        <back-button></back-button>
        <h5 class="title">Ingredient: {{ this.$route.params.ingredient }}</h5>
        <div class="row-two">
            <!-- visualizza tutti i pasti con quella lettera -->
            <card-component v-for="meal in mealsList" :meal="meal" :key="meal.idMeal" />
        </div>
    </div>
</template>

<script>
import axiosApi from "../axiosApi";
import CardComponent from "@/components/CardComponent.vue";
export default {
    name: "MealsByIngredient",
    data: function () {
        return {
            mealsList: {},
            ingredient: null,
            loading: true
        };
    },
    mounted: function () {
        console.log("ingredientPath: " + this.$route.params.ingredient);
        this.ingredient = this.$route.params.ingredient;
        console.log(this.ingredient);
        axiosApi.getByIngredient(this.ingredient).then((result) => {
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