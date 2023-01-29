<template>
  <div>
    <md-progress-bar v-show="this.loading" class="md-accent" md-mode="query"></md-progress-bar>
    Pagina dei preferiti
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loading: true
    }
  },
  mounted: function () {

  },

}
</script>

<style>

</style>