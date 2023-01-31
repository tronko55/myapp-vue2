<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div
            class="md-layout-item md-large-size-50 md-xlarge-size-50 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <!-- Header piatto -->
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <span class="md-title">{{ meal[0].strMeal }}</span>
                </div>
                <div class="md-toolbar-section-end">
                    <toggle-favorites-button :meal="meal[0]"></toggle-favorites-button>
                </div>
            </div>
            <div class="md-toolbar-row">
                <span class="md-subheader">{{ meal[0].strCategory }}</span>
            </div>
            <!-- immagine -->
            <div>

                <div>
                    <img :src="meal[0].strMealThumb" width="600px" />
                    <div>
                        <md-button class="md-raised md-primary" :href="meal[0].strYoutube">Youtube Video</md-button>
                    </div>
                </div>

            </div>
            <!-- ingredienti -->
            <md-list class="md-layout-item">
                <h4>Ingredienti</h4>
                <md-list-item v-for="i in lengthIngredients" :key="i">
                    <md-checkbox v-model="ingredientChecked[i]">
                        {{ meal[0]["strIngredient" + i] }}

                    </md-checkbox>
                    {{
                        meal[0]["strMeasure" + i]
                    }}
                </md-list-item>
            </md-list>
            <div>
                <!-- procedimento -->
                <h4>Instructions</h4>
                <ul v-for="(instruction, index) in instructions" :key="index">
                    <h5>Step {{ index + 1 }}</h5>
                    <li v-if="instruction != ''">{{ instruction }}</li>
                </ul>
            </div>
            <div>
                <!-- .prevent serve per non ricaricare la pagina -->
                <!-- button: torna indietro -->
                <md-button class="md-raised md-primary" @click.prevent="$router.back()">TORNA ALLA LISTA</md-button>
            </div>

        </div>
    </div>
</template>

<script>
import axiosApi from "../axiosApi";
import ToggleFavoritesButton from "@/components/ToggleFavoritesButton.vue";



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
        for (let i = 0; i < this.lengthIngredients; i++) {
            this.ingredientChecked.push(false);
        }
        console.log("idMealPath: " + this.$route.params.id);
        this.idMeal = this.$route.params.id
        console.log(this.idMeal);
        this.lengthIngredients = 0;
        axiosApi.getMealDetails(this.idMeal).then((response) => {
            // ho i dettagli
            this.meal = response.data.meals; // prendo il primo valore restituito
            console.log(response.data.meals)
            // this.meal[0].strInstructions = this.meal[0].strInstructions.replace(
            //     // per mettere spazio fra frasi delle istruzioni
            //     ".", // rimuovi "."
            //     ". " // rimpiazza con ". "
            // );
            for (let i = 0; i < 15; i++) {
                if (this.meal[0]["strIngredient" + i] != "") this.lengthIngredients++;

                // scorro gli ingredienti (è un JSON -> un campo con gli ingredienti scritti come nome#), mi segno in lenghtIngredients quanti ne ho
            }
            this.lengthIngredients = this.lengthIngredients - 1
            this.instructions = this.meal[0].strInstructions.split('\n')

            console.log(this.lengthIngredients)
        });
    },
    components: {
        ToggleFavoritesButton
    }
};
</script>

<style >

</style>