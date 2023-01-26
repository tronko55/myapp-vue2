<template>
    <div>

        <pre> {{ ingredients }}</pre>
    </div>
</template>

<script>
import axiosApi from '@/axiosApi';


const ingredients = ([]);
export default {

    data: function () {
        return {
            ingredients: [
            ]
        }

    },
    mounted: async function () {
        const response = await axiosApi.get('/list.php?i=list')
        console.log(response.data)
        ingredients.value = response.data

    },
}
</script>
