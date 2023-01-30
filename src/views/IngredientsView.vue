<!-- <template>
  <div>
      <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>

      <div class="md-layout md-gutter md-alignment-center">

          <div class="md-card" v-for="ingredient in ingredients" :key="ingredient.strIngredient">
              <router-link :to="{ name: 'ingredient', params: { ingredient: ingredient.strIngredient } }">
                  <md-card md-with-hover>
                      <md-card-media-cover md-text-scrim>
                          <md-card-media md-ratio="16/9">
                              <img :src="ingredient.strIngredientThumb">
                          </md-card-media>

                          <md-card-area>
                              <md-card-header>
                                  <span class="md-title">{{ ingredient.strIngredient }}</span>
                              </md-card-header>

                              <md-card-actions>
                          <md-button class="md-icon-button">
                              <md-icon>favorite</md-icon>
                          </md-button>

                      </md-card-actions> 

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
          ingredients: {},
          mealsList: [],
          loading: true
      }
  },
  mounted: function () {
      axiosApi.getIngredients().then((result) => {
          console.log(result.data.meals);
          this.ingredients = result.data.ingredients;
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
</style> -->

<template>
    <div>
        <div class="p-8 pb-0">
            <h1 class="text-4xl font-bold mb-4 text-orange-500">Ingredients</h1>
        </div>
        <div class="px-8">
            <input type="text" v-model="keyword"
                class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 mb-3 w-full"
                placeholder="Search for Ingredients" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a v-for="ingredient of computedIngredients" :key="ingredient.idIngredient"
                    class="block bg-white rounded p-3 mb-3 shadow">

                    <router-link :to="{ name: 'ingredient', params: { ingredient: ingredient.strIngredient } }">
                        <h3 class="text-2xl font-bold mb-2">{{ ingredient.strIngredient }}</h3>
                    </router-link>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axiosApi from '@/axiosApi';



const keyword = ref("");
const ingredients = ref([]);
const computedIngredients = computed(() => {
    if (!computedIngredients) return ingredients;
    return ingredients.value.filter((i) =>
        i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
    );
});

// function openIngredient(ingredient) {
//     // store.commit('setIngredient', ingredient)
//     router.push({
//         name: "byIngredient",
//         params: { ingredient: ingredient.strIngredient },
//     });
// }
onMounted(() => {
    axiosApi.getIngredients().then(({ data }) => {
        ingredients.value = data.meals;
    });
});
</script>
