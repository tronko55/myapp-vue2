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
                        <md-tab id="tab-home" md-label="Home" :to="'/'"></md-tab>
                        <md-tab id="tab-pages" md-label="Categories" :to="'/categories'"></md-tab>
                        <md-tab id="tab-favorites" md-label="Favorites" :to="'/favourites'"></md-tab>
                    </md-tabs>
                </div>

                <div class="md-toolbar-section-end">
                    <md-field class="search-bar">
                        <md-input v-model="searchTerm" @input="search" @keyup.enter="search"
                            class="md-search-field-input" type="text" placeholder="Search"></md-input>
                        <md-icon class="md-search-field-icon" @click="search">search</md-icon>
                    </md-field>
                </div>
            </div>



        </md-toolbar>

        <md-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>home</md-icon>
                    <md-list-item :to="'/'">Home</md-list-item>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <md-list-item :to="'/categories'">Categories</md-list-item>
                </md-list-item>

                <md-list-item>
                    <md-icon>star</md-icon>
                    <md-list-item :to="'/favourites'">Favourites</md-list-item>
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
    }),
    methods: {
        search() {
            // perform search here using the `searchTerm` variable
        }
    }
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


