<template>
    <div>
        <md-toolbar class="md-dense md-primary">
            <!-- Hamburger menu's button -->
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                <md-icon>menu</md-icon>
            </md-button>
            <!-- Seconda riga -->
            <div class="md-toolbar tabs-row">
                <md-tabs class="md-primary">
                    <md-tab id="tab-home" md-label="Home" :to="{ name: 'home' }"></md-tab>
                    <md-tab id="tab-pages" md-label="Categories" :to="'/categories'"></md-tab>
                    <md-tab id="tab-ingredients" md-label="Ingredients" :to="'/ingredients'"></md-tab>
                    <md-tab id="tab-favorites" md-label="Favorites" :to="'/favourites'"></md-tab>
                </md-tabs>
            </div>
        </md-toolbar>

        <!-- Hamburger menu -->
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
        menuVisible: false
    })
}
</script>

<style lang="scss" scoped>
.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
}

// per mostrare il bottone del men?? solo su disposotivin piccoli
@media screen {
    .md-icon-button {
        display: none;
    }
}

@media (max-width: 600px) {
    .md-icon-button {
        display: block;
    }

    // e per togliere le tab dai dispositivi piccoli
    .tabs-row {
        display: none;
    }
}
</style> 


