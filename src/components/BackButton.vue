<template>
    <div>
        <!-- .prevent serve per non ricaricare la pagina -->
        <md-button class="md-raised md-primary" @click.prevent="$router.back()">GO BACK</md-button>
    </div>
</template>

<script>
export default {
    name: 'BackButton'
}
</script>

<style>

</style>