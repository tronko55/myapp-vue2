<template>
    <div>
        <div class="letter-nav">
            <router-link v-for="letter in letters" :key="letter" :to="`/letter/${letter}`">{{ letter }}</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
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
    text-decoration: none;
    color: black;

    &:hover {
        background-color: #eee;
    }
}
</style>
