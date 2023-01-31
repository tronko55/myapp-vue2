<template>
    <div>
        <!-- snackbar component -->
        <md-snackbar :md-active="snackbarActive" :md-duration="3000" @update:md-active="updateSnackbarActive">
            Item removed successfully
            <md-button class="button" @click="undoRemoveFavourite(undoItem)">Undo</md-button>
        </md-snackbar>
    </div>
</template>

<script>

</script>
