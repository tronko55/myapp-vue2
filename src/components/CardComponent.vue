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
                    <md-button @click.prevent="toggleFavourites(meal)">
                        <md-icon>bookmark_add</md-icon>
                    </md-button>
                    <md-button>Read more</md-button>
                </md-card-actions>
            </md-card>
        </router-link>
    </div>
</template>
<script>
import firebaseService from '@/firebaseService';
export default {
    data: function () {
        return {
            favourites: [],
        }
    },
    props: ['meal'],
    mounted: function () {
        this.loading = true;

        firebaseService.getFavourites().then((favourites) => {
            this.favourites = favourites;
            this.loading = false;
        });

    },
    methods: {
        toggleFavourites(meal) {
            firebaseService.getFavourites();
            let index = this.favourites.findIndex(favorite => favorite.idMeal === meal.idMeal);
            if (index === -1) {
                // not in favourites, add it
                this.favourites.push(meal);
                firebaseService.addToFavourites(meal);
            } else {
                // already in favourites, remove it
                this.favourites.splice(index, 1);
                firebaseService.removeFromFavourites(meal);
            }
        },

    },
}
</script>
