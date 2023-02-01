<template>
    <div>
        <div class="letter-nav">
            <!-- mostra una lettera per ogni lettera dell'alfabeto e ogni lettera è un link alla pagina che ha come parametro quella lettera -->
            <router-link v-for="letter in letters" :key="letter"
                :to="{ name: 'byLetter', params: { letter: letter.toLocaleLowerCase() } }">
                {{ letter }}
            </router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        }
    },
    props: {
        letter: String
    }
}
</script>

<style>
.letter-nav {
    display: flex;
    justify-content: center;
}

.letter-nav a {
    padding: 8px;
    font-size: 16px;
    text-decoration: none;
    color: black;
}

@media (max-width: 600px) {
    .letter-nav {
        flex-wrap: wrap;
        justify-content: center;
    }

    .letter-nav a {
        padding: 8px;
        font-size: 16px;
    }
}
</style>
