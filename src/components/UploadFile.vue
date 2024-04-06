<script setup>
import { ref } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
const fileInput = ref(null)
const store = useImagesStore()
const { images } = storeToRefs(store)
function onChange() {
    var fr = new FileReader();
    var i = 0;
    fr.onload = function () {
        images.value.push(fr.result);
        if (i < fileInput.value?.files.length) {
            fr.readAsDataURL(fileInput.value?.files[i]);
            i++;
        }

    }
    fr.readAsDataURL(fileInput.value?.files[i]);
    i++;
}
function idChange(event, i) {
    console.log(event.target)
    images[i][0] = event.target.value
}
</script>

<template>

    <div class="row row-cols-5" style="margin-left: auto;">
        <div class="col" v-for="[i, k] in images.entries() " v-bind:key="i">

            <img class="rounded float-none" :src="k" @click="console.log(i, k)" />
            <div>#<input type="text" class="form-control" :value="i" @change="idChange($event, i)"></div>

        </div>
    </div>
    <div class="input-group mb-3">
        <input ref="fileInput" type="file" @change="onChange()" accept="image/*" multiple="multiple"
            class="form-control" id="inputGroupFile02" />
    </div>

</template>

<style scoped>
img {
    padding: 0 10px 10px;
    width: 175px;
}
</style>
