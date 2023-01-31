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
      <md-button @click.prevent="removeFavourite(favourite)">Remove</md-button>
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
  watch: {
    favourites: function () {
      firebaseService.getFavourites().then((favourites) => {
        this.favourites = favourites;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loading = true;
    firebaseService.getFavourites().then((favourites) => {
      this.favourites = favourites;
      this.loading = false;
    });
  },
  methods: {
    removeFavourite(favourite) {
      this.loading = true;
      firebaseService.removeFromFavourites(favourite).then(() => {
        this.favourites = this.favourites.filter(
          (fav) => fav.id !== favourite.id
        );
        this.loading = false;
      });
    },
  },
};
</script>
