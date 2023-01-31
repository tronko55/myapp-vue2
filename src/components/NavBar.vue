<template>
    <div>
        <md-toolbar class="md-dense md-primary">
            <!-- Prima riga -->
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">

                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>

                    <!-- <span class="md-title">Titolo pagina</span> -->
                </div>
                <!-- Seconda riga -->
                <div class="md-toolbar tabs-row">
                    <md-tabs class="md-primary">
                        <md-tab id="tab-home" md-label="Home" :to="{ name: 'home' }"></md-tab>
                        <md-tab id="tab-pages" md-label="Categories" :to="'/categories'"></md-tab>
                        <md-tab id="tab-ingredients" md-label="Ingredients" :to="'/ingredients'"></md-tab>
                        <md-tab id="tab-favorites" md-label="Favorites" :to="'/favourites'"></md-tab>
                    </md-tabs>
                </div>


            </div>
        </md-toolbar>

        <md-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

            <md-list>
                <md-list-item :to="{ name: 'home' }">
                    <md-icon>home</md-icon>
                    <md-list-item>Home</md-list-item>
                </md-list-item>

                <md-list-item :to="'/categories'">
                    <md-icon>category</md-icon>
                    <md-list-item>Categories</md-list-item>
                </md-list-item>


                <md-list-item :to="'/ingredients'">
                    <md-icon>egg</md-icon>
                    <md-list-item>Ingredients</md-list-item>
                </md-list-item>

                <md-list-item :to="'/favourites'">
                    <md-icon>star</md-icon>
                    <md-list-item>Favourites</md-list-item>
                </md-list-item>

            </md-list>
        </md-drawer>

    </div>

</template>

<script>
export default {
    name: 'LastRowFixed',
    data: () => ({
        menuVisible: false,
        searchTerm: ""
    })
}
</script>


<style lang="scss" scoped>
.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
}

.search-bar {
    color: white;
}

@media screen {
    .md-icon-button {
        display: none;
    }
}

@media (max-width: 600px) {
    .md-icon-button {
        display: block;
    }

    .tabs-row {
        display: none;
    }
}
</style> 


