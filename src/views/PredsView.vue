<script setup>
import { storeToRefs } from "pinia";
import { ref, toRaw } from "vue"
import UploadFile from "../components/UploadFile.vue"
import { useImagesStore } from "@/stores/ImagesStore";
const store = useImagesStore()
const { images } = storeToRefs(store)
let arrayImages = [];
const error = ref(false)
function validAndSend() {
    let temp = [];
    arrayImages = [];
    if (images.value.length == 0) {
        error.value = true
    }
    else {
        for (let i = 0; i < 5; i++) {
            temp.push(images.value[i].id)
        }
        console.log(temp)
        for (let i = 0; i < 5; i++) {
            let id = temp.indexOf(i)
            if (id == -1) {
                error.value = true
                break;
            }
            arrayImages.push([temp.indexOf(i)])
        }
        console.log(arrayImages)
    }
}
</script>

<template>
    <div class="page">
        <div>
            <span class="text">
                <h4>Выберете фотаграфии посещенных мест и укажите порпядок их посещения
                </h4>
            </span>
            <UploadFile />
        </div>
        <div class="box">
            <div>
                <button type="button" class="btn btn-outline-primary center" @click="validAndSend()">Получить
                    список интересных
                    мест</button>
            </div>
            <div v-if="error">
                <CAlert color="warning">
                    Мало фотографий или неверно указан порядок посещения
                </CAlert>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.center {
    width: 24em;
    height: 3em;

}

.text {
    display: flex;
    padding: 5px;
    font: 1em sans-serif;

}

.page {
    width: auto;
    height: 100%;
    padding: 5px;
    border-radius: 10px;
}
</style>