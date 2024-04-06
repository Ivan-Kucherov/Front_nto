<script setup>
import { ref, toRaw } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
const fileInput = ref(null)
const images = ref([])
</script>

<template>
    <div class="row row-cols-6" style="margin-left: auto;">
        <div class="col" v-for="item in images" v-bind:key="item">
            <img src="@\assets\logo.svg" />
        </div>
    </div>
</template>

<style scoped>
img {
    padding: 0 5px 5px;
    width: 10rem;
    height: 10rem;
}
</style>
