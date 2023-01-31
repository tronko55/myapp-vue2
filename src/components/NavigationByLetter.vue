<template>
    <div>
        <div class="letter-nav">
            <router-link v-for="letter in letters" :key="letter"
                :to="{ name: 'byLetter', params: { letter: letter.toLocaleLowerCase() } }">{{
    letter
                }}</router-link>
        </div>
        <router-view />

    </div>
</template>

<script>
// import axiosApi from '@/axiosApi';
export default {
    data() {
        return {
            letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        }
    },
    props: {
        letter: {
            type: String,
        }
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

    &:hover {
        background-color: #eee;
    }
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
