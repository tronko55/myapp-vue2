<template>
    <div class="md-layout">


        <div
            class="md-layout-item md-large-size-50 md-xlarge-size-50 md-medium-size-100 md-small-size-100 md-xsmall-size-100">

            <!-- Header piatto -->
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">

                    <span class="md-title">{{ meal[0].strMeal }}</span>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button>
                        <md-icon>
                            bookmark_add
                        </md-icon>
                    </md-button>
                </div>
            </div>
            <div class="md-toolbar-row">
                <span class="md-subheader">{{ meal[0].strCategory }}</span>

            </div>
            <!-- immagine -->
            <div>
                <div>
                    <img :src="meal[0].strMealThumb" width="600px" />
                </div>
            </div>

            <!-- ingredienti -->
            <md-list class="md-layout-item">
                <h4>Ingredienti</h4>
                <!-- v-for per il numero di ingredienti, poi chiedo ogni volta se c'è ingrediente, se sì allora metti pallino -->
                <md-list-item v-for="i in lengthIngredients" :key="i">
                    <span class="md-list-item-text" v-if="meal[0]['strIngredient' + i] != null">{{
                        meal[0]["strIngredient" +
                            i]
                    }}</span></md-list-item>
            </md-list>
            <div
                class="md-layout-item md-large-size-100 md-xlarge-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
                <!-- strIngredient0 è primo ingrediente del drink, strIngrediet1 il secondo ... -->
                <!-- procedimento -->
                <h4>Procedimento</h4>
                <md-content>{{
                    meal[0].strInstructions
                }}</md-content>

                <div>
                    <!-- .prevent serve per non ricaricare la pagina -->
                    <!-- button: torna indietro -->
                    <md-button class="md-raised md-primary" @click.prevent="$router.back()">TORNA ALLA LISTA</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import load from "../axiosApi";
import axiosApi from "../axiosApi";

export default {
    name: "MealView",
    data: function () {
        return {
            meal: null,
            idMeal: null,
            lengthIngredients: 0,
        };
    },
    mounted: function () {
        // dopo aver costruito il template
        // var getId = ''
        console.log("idMealPath: " + this.$route.params.id);

        this.idMeal = this.$route.params.id.split('/')[1];
        console.log(this.idMeal);
        this.lengthIngredients = 0;

        axiosApi.getMealDetails(this.idMeal).then((response) => {
            // ho i dettagli
            this.meal = response.data.meals; // prendo il primo valore restituito
            console.log(response.data.meals)
            this.meal[0].strInstructions = this.meal[0].strInstructions.replace(
                // per mettere spazio fra frasi delle istruzioni
                ".", // rimuovi "."
                ". " // rimpiazza con ". "
            );
            for (let i = 0; i < 15; i++) {
                if (this.meal[0]["strIngredient" + i] != null) this.lengthIngredients++;
                // scorro gli ingredienti (è un JSON -> un campo con gli ingredienti scritti come nome#), mi segno in lenghtIngredients quanti ne ho
            }
        });
    },
};
</script>

<style>

</style>