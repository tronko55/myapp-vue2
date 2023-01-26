<template>
    <div>
        <md-toolbar class="md-large md-dense md-primary">
            <!-- Prima riga -->
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">

                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <span class="md-title">Titolo pagina</span>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                        <md-icon>more_vert</md-icon>
                    </md-button>
                </div>
            </div>

            <!-- Seconda riga -->
            <div class="md-toolbar-row">
                <md-tabs class="md-primary">
                    <md-tab id="tab-home" md-label="Home" to="/home"></md-tab>
                    <md-tab id="tab-pages" md-label="Categories" to="/categories"></md-tab>
                    <md-tab id="tab-favorites" md-label="Favorites" to="/favourites"></md-tab>
                </md-tabs>
            </div>
        </md-toolbar>

        <md-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">Home</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">Categories</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>star</md-icon>
                    <span class="md-list-item-text">Preferiti</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>info</md-icon>
                    <span class="md-list-item-text">About</span>
                </md-list-item>
            </md-list>
        </md-drawer>

    </div>

</template>

<script>
export default {
    name: 'LastRowFixed',
    data: () => ({
        menuVisible: false
    })
}
</script>


<style lang="scss" scoped>
.md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
}

// Demo purposes only
.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
}

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
</style> 


