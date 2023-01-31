<template>
    <div>
        <md-button @click.prevent="toggleFavourites(meal)">
            <md-icon v-if="isInFavourites(meal)">bookmark</md-icon>
            <md-icon v-else>bookmark_border</md-icon>
        </md-button>
    </div>
</template>

<script>
import firebaseService from '@/firebaseService';
export default {
    name: "FavouriteButton",
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
        isInFavourites(meal) {
            return this.favourites.findIndex((favorite) => favorite.idMeal === meal.idMeal) !== -1;
        },
    },
}
</script>

<style>

</style>