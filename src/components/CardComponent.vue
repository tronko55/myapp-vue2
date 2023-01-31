<template>
    <div>
        <!-- il router rimanda al meal della carta -->
        <router-link :to="{ name: 'meal', params: { id: meal.idMeal } }">
            <md-card class="md-card" md-with-hover>
                <md-card-media>
                    <img :src="meal.strMealThumb" />
                </md-card-media>
                <md-card-header>
                    <div class="md-title">{{ meal.strMeal }}</div>
                    <div class="md-subhead">{{ meal.strCategory }}</div>
                </md-card-header>
                <md-card-actions>
                    <toggle-favorites-button :meal="meal"></toggle-favorites-button>
                </md-card-actions>
            </md-card>
        </router-link>
    </div>
</template>
<script>
import ToggleFavoritesButton from './ToggleFavoritesButton.vue';
export default {
    data: function () {
        return {
            favourites: [],
        }
    },
    props: ['meal'],
    components: {
        ToggleFavoritesButton
    }
}
</script>
