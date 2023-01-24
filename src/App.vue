<!-- Questa è la prima cosa che si apre (la Pagina principale, ma non la home)
Qua ci stanno quindi la tool/navigation bar con le tab, e il contenuto cambia in base alla tab che premo. Il contenuto è quello che si trova in views.
Ci vanno anche la barra di ricerca (altra view a parte) ed eventualmente la parte di "login" -->
<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">My Title</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
            <md-tab id="tab-pages" md-label="Categories" to="/categories"></md-tab>
            <md-tab id="tab-favorites" md-label="Favorites" to="/favourites"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <!-- RouterView for SPA: cambia il contenuto ma non tuttò ciò che c'è prima -->
      <md-app-content>
        <div>
          <router-view></router-view>
        </div>

        <div>
          Qua posso mettere la paginazione oppure le lettere più probabilmente
        </div>
      </md-app-content>
    </md-app>

  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {

    };
  },
  methods: {

  },
  mounted: function () {
    this.$router.push("/");
  },
  components: {
  }

}
</script>

<!-- <style lang="scss" scoped>
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, .12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style> -->
<style lang="scss">
@media (max-width: 400px) {

  //Sposta i bottoni del menù in colonna per schermi < 400px
  .md-tabs-navigation {
    flex-direction: column;
  }

  .md-toolbar-section-end {
    //Sposta bottone Logout del menù in colonna per schermi < 400px
    flex-direction: row-reverse;
  }
}

@media (max-width: 700px) {

  //Evita che footer possa coprire le card su schermi fino a max 700px
  #footer {
    position: relative;
  }
}



.search {
  max-width: 50%;
  text-align: center;
}
</style>