<script setup>
import { ref, toRaw } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
const fileInput = ref(null)
const images = ref([1, 2, 3, 4, 5, 6, 7])
</script>

<template>
    <div class="row row-cols-6">
        <div class="col" v-for="item in images" v-bind:key="item">
            <img class="row" src="@\assets\logo.svg" />
            <span class="row desc">
                text text text text text text text text text text text text text text text text text text text text

            </span>
        </div>
    </div>
</template>

<style scoped>
img {
    padding: 0 5px 5px;
    width: 10rem;
    height: 10rem;
}

.desc {
    border: 2px;
    border-radius: 5px;
    width: 12rem;
    height: 6rem;
    font-size: small;
    overflow-wrap: normal;
    border-color: rgb(3, 85, 3);
    border-style: solid;
}
</style>
