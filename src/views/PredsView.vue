<script setup lang='ts'>

import { storeToRefs } from "pinia";
import { ref, toRaw, shallowRef } from "vue"
import UploadFile from "../components/UploadFile.vue"
import ResultItems from "../components/ResultsItem.vue"
import { useImagesStore } from "@/stores/ImagesStore";
import axios from "axios";
//Можно использовать для различных преобразований
//const map = shallowRef < null | YMap > (null);
//ymaps3.getDefaultConfig().setApikeys('35947662-8410-4e55-974a-a80dbb97c767')
const store = useImagesStore()
const { images, response_images, type } = storeToRefs(store)
let arrayImages = [];
const error = ref(false)
let error_text = "Отсутствуют фотографии"

function validAndSend() {
    console.log(type.value)
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
        //console.log(temp)
        for (let i = 0; i < images.value.length; i++) {
            let id = temp.indexOf(i)
            if (id == -1) {
                error.value = true
                error_text = "Неправильно указан порядок посещения"
                break;
            }
            arrayImages.push(images.value[temp.indexOf(i)].image)
        }

        if (images.value.length != arrayImages.length) {
            error.value = true
            error_text = "Неправильно указан порядок посещения"

        }
        else if (!error.value) {
            error.value = false
            //console.log(arrayImages)
        }
    }
    if (!error.value) {
        axios({
            method: 'post',
            url: '/items',
            data: { images: arrayImages, type: type.value },
        }).then(function (response) {
            response_images.value = response.data.images
        })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>

<template>
    <div class="page">
        <div class="box">
            <span class="text">
                <h4>Выберете фотографии посещенных мест и укажите порядок их посещения
                </h4>
            </span>
            <UploadFile />
        </div>
        <div class="box">
            <div style="flex-direction: row;">
                <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioVModel1" value="Nearest" v-model="type"
                    inline label="Ближайшие" />
                <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioVModel2" value="all" v-model="type" inline
                    label="Все" checked />
            </div>
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
        <div class="box border_back">
            <span class="text">
                <p style="font: 2em sans-serif;">Наиболее интересные места для посещения
                </p>
            </span>
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

    padding: 5px 10px 20px;
}

.border_back {
    background-color: rgba(113, 163, 255, 0.13);
    border-radius: 12px;
}

.center {
    width: 24em;
    height: 3em;

}

.text {

    padding: 5px;
    font: 1em sans-serif;

}

.page {
    border-radius: 10px;
}
</style>