<!-- Questa è la prima cosa che si apre (la Pagina principale, ma non la home)
Qua ci stanno quindi la tool/navigation bar con le tab, e il contenuto cambia in base alla tab che premo. Il contenuto è quello che si trova in views.
Ci vanno anche la barra di ricerca (altra view a parte) ed eventualmente la parte di "login" -->

<template>
    <div>
      <md-toolbar class="md-primary">
      <h3 class="md-title">Primary</h3>
    </md-toolbar><div>
      <router-link to="/">Home</router-link> |
      <router-link to="/categories">Categories</router-link> |
      <router-link to="/favourites">Favourites</router-link> 

    </div>

    <!-- RouterView for SPA: cambia il contenuto ma non tuttò ciò che c'è prima -->
    <div>
        <router-view></router-view>
    </div>
<div>
    <!-- Qua posso mettere la paginazione oppure le lettere più probabilmente -->
</div>
</div>
</template>

<script>
export default {
    name: "App",
    data() {

    },
    methods:{

    },
    mounted: function () {
    this.$router.push("/");
  },
}
</script>

<style>
</style>
