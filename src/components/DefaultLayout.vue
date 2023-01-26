<template>
    <div>
        <nav-bar />
        <main>
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