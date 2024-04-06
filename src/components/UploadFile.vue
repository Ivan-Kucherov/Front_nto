<script setup>
import { ref, toRaw } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
const fileInput = ref(null)
const store = useImagesStore()
const { images } = storeToRefs(store)
let id_photo = 0
function onChange() {
    var fr = new FileReader();
    var i = 0;
    fr.onload = function () {
        images.value.push({ id: id_photo++, image: fr.result });
        if (i < fileInput.value?.files.length) {
            fr.readAsDataURL(fileInput.value?.files[i]);
            i++;
        }
        /*if (images.value.length > 5) {
            images.value.shift()
            for (let i = 0; i < 5; i++) {
                images.value[i].id = i
            }
        */
    }
    fr.readAsDataURL(fileInput.value?.files[i]);
    i++;
}

function idChange(event, item) {
    if (event.target.value > images.value.length
        //| event.target.value >= 5 
        | event.target.value < 0) {
        event.target.value = 0
    }
    console.log(images.value)
    item.id = Number(event.target.value - 1)



}
</script>

<template>
    <div class="row row-cols-6">
        <div class="col" v-for="item in images" v-bind:key="item">
            <img class="rounded float-none" :src="item.image" @click="console.log(item.id)" />
            <div style="display: flex;
    flex-direction: row;">
                <span style="max-width: 25%;" class="form-control">№</span>
                <input style="max-width: 75%;" type="text" class="form-control" :value="item.id + 1"
                    @change="idChange($event, item)">
            </div>
        </div>
    </div>
    <div class="input-group mb-3" style="padding-top: 1rem;">
        <input ref="fileInput" type="file" @change="onChange()" accept="image/*" multiple="multiple"
            class="form-control " id="inputGroupFile02" />
    </div>
</template>

<style scoped>
img {
    padding: 0 5px 5px;
    width: 80%;
    height: 80%;
}
</style>
