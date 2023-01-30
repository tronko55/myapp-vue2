<template>
    <div>
        <!-- la navbar rimane in tutte le schermate -->
        <nav-bar />
        <main>
            <!-- di default rimanda alla home -->
            <router-view />
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
    components: {
        NavBar
    }

}
</script>

<style>

</style>