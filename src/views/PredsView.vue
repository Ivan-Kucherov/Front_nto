<script setup>

import { storeToRefs } from "pinia";
import { ref, toRaw } from "vue"
import UploadFile from "../components/UploadFile.vue"
import ResultItems from "../components/ResultsItem.vue"
import { useImagesStore } from "@/stores/ImagesStore";
import axios from 'axios'

const store = useImagesStore()
const { images } = storeToRefs(store)
let arrayImages = [];
const error = ref(false)
let error_text = "Отсутствуют фотографии"
function validAndSend() {
    let temp = [];
    arrayImages = [];
    error.value = false;
    if (images.value.length == 0) {
        error.value = true
    }
    else {
        for (let i = 0; i < images.value.length; i++) {
            temp.push(images.value[i].id)
        }
        console.log(temp)
        for (let i = 0; i < images.value.length; i++) {
            let id = temp.indexOf(i)
            if (id == -1) {
                error.value = true
                error_text = "Неправельно указан порядок посещения"
                break;
            }
            arrayImages.push(images.value[temp.indexOf(i)].image)
        }

        if (images.value.length != arrayImages.length) {
            error.value = true
            error_text = "Неправельно указан порядок посещения"

        }
        else if (!error.value) {
            error.value = false
            console.log(arrayImages)
        }
    }
    if (!error.value) {
        axios({
            method: 'post',
            url: '/items',
            data: { images: arrayImages },
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
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
                    {{ error_text }}
                </CAlert>
            </div>
        </div>
        <div>
            <ResultItems />
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