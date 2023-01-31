<!-- <template>
  <div>
    <md-progress-bar v-show="this.loading" class="md-accent" md-mode="query"></md-progress-bar>
    Pagina dei preferiti
    <md-list-item v-for="favourite in favourites" :key="favourite.id">
      {{ favourite.name }}
      <md-button @click.prevent="removeFavourite(favourite.id)">Remove</md-button>
    </md-list-item>

  </div>
</template>
<script>
import firebaseService from '@/firebaseService';

export default {

}
</script>
 -->

<template>
  <div>
    <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
    Pagina dei preferiti
    <md-list-item v-for="favourite in favourites" :key="favourite.id">
      {{ favourite.name }}
      <md-button @click.prevent="removeFavourite(favourite.id)">Remove</md-button>
    </md-list-item>

  </div>
</template>

<script>
import firebaseService from '@/firebaseService';

export default {
  data() {
    return {
      favourites: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    firebaseService.getFavourites().then((favourites) => {
      this.favourites = favourites;
      this.loading = false;
    });
  },
  methods: {
    removeFavourite(favouriteId) {
      this.loading = true;
      firebaseService.removeFromFavourites({ id: favouriteId }).then(() => {
        this.favourites = this.favourites.filter(
          (favourite) => favourite.id !== favouriteId
        );
        this.loading = false;
      });
    },
  },
};
</script>
