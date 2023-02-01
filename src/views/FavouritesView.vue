
<template>
  <div>
    <md-progress-bar v-show="loading" class="md-accent" md-mode="query"></md-progress-bar>
    <h1 class="title">Favourites</h1>
    <h3 class="sub">Here are listed the recipes that you have saved for later</h3>
    <div class="row-two md-layout-item md-gutter md-alignment-center">
      <card-component-vue v-for="meal in favourites" :key="meal.id" :meal="meal"></card-component-vue>
    </div>
  </div>
</template>

<script>
import firebaseService from '@/firebaseService';
import CardComponentVue from '@/components/CardComponent.vue';

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
      console.log(favourites)
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

      });
    },
  },
  components: {
    CardComponentVue
  }
};
</script>

<style >
.sub {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>