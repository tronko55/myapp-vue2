<template>
    <div>
        <md-button @click.prevent="toggleFavourites(meal)">
            <!-- use the isInFavourites(meal) method to determine whether to display the "bookmark" or "bookmark_border" icon on the button -->
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
    //     When the component is mounted, retrieve the list of all favorite meals from a firebase service (firebaseService.getFavourites()) 
    //    and store it in the favourites data property (locale).
    mounted: function () {
        this.loading = true;
        firebaseService.getFavourites().then((favourites) => {
            this.favourites = favourites;
            this.loading = false;
        });
    },
    methods: {
        /*
        Cliccando il pulsante cambia lo stato del meal 
        Se non è tra i preferiti, aggiungilo: (firebaseService.addToFavourites(meal)). 
        Se è già tra i preferiti, rimuovilo dal firebase (firebaseService.removeFromFavourites(meal)).
        */
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
        // This method returns true if the meal is in the favorites list, and false otherwise.
        isInFavourites(meal) {
            return this.favourites.findIndex((favorite) => favorite.idMeal === meal.idMeal) !== -1;
        },
    },
}
</script>