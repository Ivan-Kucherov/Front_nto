<script setup>
import { ref, toRaw } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
const fileInput = ref(null)
const store = useImagesStore()
const { images } = storeToRefs(store)
function onChange() {
    var fr = new FileReader();
    var i = 0;
    fr.onload = function () {
        images.value.push({ id: i - 1, image: fr.result });
        if (i < fileInput.value?.files.length) {
            fr.readAsDataURL(fileInput.value?.files[i]);
            i++;
        }
        if (images.value.length > 5) {
            images.value.shift()
            for (let i = 0; i < 5; i++) {
                images.value[i].id = i
            }
        }

    }
    fr.readAsDataURL(fileInput.value?.files[i]);
    i++;
}
function idChange(event, item) {
    if (event.target.value >= images.value.length | event.target.value >= 5 | event.target.value < 0) {
        event.target.value = 0
    }
    console.log(images.value)
    item.id = Number(event.target.value)



}
</script>

<template>
    <div class="row row-cols-5" style="margin-left: auto;">
        <div class="col" v-for="item in images" v-bind:key="item">
            <img class="rounded float-none" :src="item.image" @click="console.log(item.id)" />
            <div style="display: flex;
    flex-direction: row;">
                <span style="max-width: 3em" class="form-control">№</span>
                <input type="text" class="form-control" :value="item.id" @change="idChange($event, item)">
            </div>
        </div>
    </div>
    <div class="input-group mb-3">
        <input ref="fileInput" type="file" @change="onChange()" accept="image/*" multiple="multiple"
            class="form-control " id="inputGroupFile02" />
    </div>
</template>

<style scoped>
img {
    padding: 0 10px 10px;
    width: 175px;
    height: 175px;
}
</style>
