<template>
    <div>
        Pagina del piatto

        <div class="md-layout">
            <div
                class="md-layout-item md-large-size-50 md-xlarge-size-50 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
                <!-- nome -->
                <div id="wrapperTitle">
                    <span id="drinkScelto_nome" class="md-title">{{ meal.strMeal }}</span>
                </div>
                <!-- immagine -->
                <div>
                    <img id="drinkScelto_immagine" v-if="meals != []" :src="meal.strMealThumb" />
                </div>
            </div>

            <!-- ingredienti -->

            <md-list id="drinkScelto_ingredienti" class="md-layout-item">
                <h4 id="titIngr">Ingredienti</h4>
                <!-- v-for per il numero di ingredienti, poi chiedo ogni volta se c'è ingrediente, se sì allora metti pallino -->
                <md-list-item v-for="i in lengthIngredients" :key="i">
                    <span class="md-list-item-text" v-if="meal['strIngredient' + i] != null">{{
                meal["strIngredient" +
                    i] }}</span></md-list-item>
            </md-list>
            <div
                class="md-layout-item md-large-size-100 md-xlarge-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
                <!-- strIngredient0 è primo ingrediente del drink, strIngrediet1 il secondo ... -->
                <!-- procedimento -->
                <h4 id="titleProc">Procedimento</h4>
                <md-content id="drinkScelto_proc">{{
                    meal.strInstructions
                }}</md-content>

                <div id="drinkScelto_button">
                    <!-- .prevent serve per non ricaricare la pagina -->
                    <!-- button: torna indietro -->
                    <md-button class="md-raised md-primary" @click.prevent="$router.back()">TORNA ALLA LISTA</md-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import load from "../axiosApi";

export default {
    name: "Meal",
    data: function () {
        return {
            meal: null,
            idMeal: null,
            lengthIngredients: 0,
        };
    },
    mounted: function () {
        // dopo aver costruito il template
        this.lengthIngredients = 0;
        this.idMeal = this.$route.params.id; // voglio i dettagli di quale drink? vedi id
        load.getMealDetails(this.idMeal).then((response) => {
            // ho i dettagli
            this.meal = response.data.meal[0]; // prendo il primo valore restituito
            // this.meal.strInstructions = this.meal.strInstructions.replace(
            //     // per mettere spazio fra frasi delle istruzioni
            //     ".", // rimuovi "."
            //     ". " // rimpiazza con ". "
            // );
            for (let i = 0; i < 15; i++) {
                if (this.meal["strIngredient" + i] != null) this.lengthIngredients++;
                // scorro gli ingredienti (è un JSON -> un campo con gli ingredienti scritti come nome#), mi segno in lenghtIngredients quanti ne ho
            }
        });
    },
};
</script>

<style>

</style>