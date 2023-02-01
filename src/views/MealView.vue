<template>
    <div class="page-container">
        <!-- Header piatto -->
        <div class="md-toolbar-section-end">
            <div class="title">{{ meal[0].strMeal }}</div>
            <toggle-favorites-button class="md-toolbar-section-end" :meal="meal[0]"></toggle-favorites-button>
        </div>
        <!-- contenuti -->
        <div class="row-two">
            <img :src="meal[0].strMealThumb" />
            <md-button class="md-raised md-primary" :href="meal[0].strYoutube">Youtube Video</md-button>
            <div class="row">
                <!-- ingredienti -->
                <md-list class="md-layout-item">
                    <h2>Ingredienti</h2>
                    <md-list-item v-for="i in lengthIngredients" :key="i">
                        <div class="list">
                            <md-checkbox v-model="ingredientChecked[i]"></md-checkbox>
                            <label>{{ meal[0]["strIngredient" + i] }}</label>
                        </div>
                        <label>{{ meal[0]["strMeasure" + i] }}</label>
                    </md-list-item>
                </md-list>
            </div>
            <div class="row">
                <!-- procedimento -->
                <h2>Instructions</h2>
                <div class="instruction-list">
                    <ul style="padding-left: 0px;" v-for="(instruction, index) in instructions" :key="index">
                        <h3 class="span">Step {{ index + 1 }}</h3>
                        <div v-if="instruction != ''">{{ instruction }}</div>
                    </ul>
                </div>
            </div>
            <back-button></back-button>
        </div>
    </div>
</template>

<script>
import axiosApi from "../axiosApi";
import ToggleFavoritesButton from "@/components/ToggleFavoritesButton.vue";
import BackButton from "@/components/BackButton.vue";

export default {
    name: "MealView",
    data: function () {
        return {
            meal: null,
            idMeal: null,
            lengthIngredients: 0,
            instructions: [],
            ingredientChecked: [],
        };
    },
    mounted: function () {
        // per il checkbox
        for (let i = 0; i < this.lengthIngredients; i++) {
            this.ingredientChecked.push(false);
        }
        console.log("idMealPath: " + this.$route.params.id);
        // prendi l'id del pasto dal router
        this.idMeal = this.$route.params.id
        console.log(this.idMeal);

        // prendi i dettagli del meal a partire dall'id
        axiosApi.getMealDetails(this.idMeal)
            .then((response) => {
                // ho i dettagli
                this.meal = response.data.meals; // prendo il primo valore restituito
                console.log(response.data.meals)

                // mi serve per non mettere in elenco lista elementi nuovi
                for (let i = 0; i < 15; i++) {
                    if (this.meal[0]["strIngredient" + i] != "") this.lengthIngredients++;
                }
                this.lengthIngredients = this.lengthIngredients - 1
                this.instructions = this.meal[0].strInstructions.split('\n')
                console.log(this.lengthIngredients)
            });
    },
    components: {
        ToggleFavoritesButton,
        BackButton
    }
};
</script>

<style lang="scss" scoped>
.md-layout-item {
    background: none;
}

@media (min-width: 992px) {
    .page-container {
        max-width: 960px;
    }

    .title {
        margin-left: 1em;
    }
}

@media (min-width: 770px) {
    .page-container {
        max-width: 720px;
    }

    .title {
        margin-left: 1em;

    }
}

@media (min-width: 600) {

    .page-container {
        max-width: 540px;
    }
}
</style>
