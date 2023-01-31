
<template>
  <div>
    <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
    Pagina dei preferiti
    <md-list-item v-for="favourite in favourites" :key="favourite.id">
      {{ favourite.name }}
      <md-button @click.prevent="removeFavourite(favourite)">Remove</md-button>
    </md-list-item>
    <!-- snackbar component -->
    <SnackBar></SnackBar>
    <md-snackbar :md-active="snackbarActive" :md-duration="3000" @update:md-active="updateSnackbarActive">
      Item removed successfully
      <md-button @click="undoRemoveFavourite(undoItem)">Undo</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import firebaseService from '@/firebaseService';
import SnackBar from '@/components/SnackBar.vue'

export default {
  data() {
    return {
      favourites: [],
      loading: false,
      snackbarActive: false,
      undoItem: null
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
      this.undoItem = favourite;
      firebaseService.removeFromFavourites(favourite).then(() => {
        this.favourites = this.favourites.filter(
          (fav) => fav.id !== favourite.id
        );
        this.loading = false;
        this.snackbarActive = true;
      });
    },
    undoRemoveFavourite(undoItem) {
      firebaseService.addToFavourites(undoItem).then(() => {
        this.favourites.push(undoItem);
        this.snackbarActive = false;
        this.undoItem = null;
      });
    },
    updateSnackbarActive(value) {
      this.snackbarActive = value;
    }
  },
  components: {
    SnackBar
  }
};
</script>

<style >

</style>