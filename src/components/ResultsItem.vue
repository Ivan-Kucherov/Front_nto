<script setup lang="ts">
import { ref, toRaw } from "vue"
import { useImagesStore } from "../stores/ImagesStore"
import { storeToRefs } from 'pinia'
import { CRow } from "@coreui/vue";
import type { LngLat, YMap } from '@yandex/ymaps3-types';

//import { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapDefaultMarker, getBoundsFromCoords, getLocationFromBounds,  YandexMapMarker } from 'vue-yandex-maps';


const fileInput = ref(null)
const storage = useImagesStore()
const images = storeToRefs(storage).response_images
const show = ref(null)
</script>

<template>
    <yandex-map v-model="map" :settings="{
                location: {
                    center: [44.006516, 56.326797],
                    zoom: 9,
                },
            }" width="100%" height="300px">
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />
        <yandex-map-marker v-for="[i,item] in images.entries()" :key="i"
            :settings="{ coordinates: item.pos, popup: { position: 'top' },onClick:()=>{(show==i)?show=null:show=i},  zIndex: (show=i)? 1 : 0  }" position="top-center left-center">
            <div style="display: flex;flex-direction: column;  align-items: center;
  justify-content: center;">
            <img class="pin" alt="" :src="item.img" />
            <span v-if="show == i" style="color: darkblue;border:solid 2px;background-color:rgba(20, 129, 222, 0.64);border-radius: 10%; font-size: small;text-wrap: nowrap;">Marker with slot</span>
        </div>
        </yandex-map-marker>
    </yandex-map>
    <CContainer>
        <CRow :xs="{ cols: 5 }">
            <CCol
                style="display: flex; flex-direction: column; justify-content: center;align-content: center; margin-bottom:  1rem;"
                v-for="[i,item] in images.entries()" v-bind:key="i">
                <div style="width: 100%; margin: 0 auto;" @click="show=i">
                    <div style="display: flex; justify-content: center;align-content: center;">
                        <img class="" :src="item.img" />
                    </div>
                    <div style="display: flex; justify-content: center;align-content: center; width: 100%;height:10rem">
                        <span class="desc">
                            {{ item.text }}

                        </span>
                    </div>

                </div>
            </CCol>
        </CRow>

    </CContainer>
</template>

<style scoped>
img {
    padding: 0 5px 0px;
    width: 75%;
    max-width: 12rem;
    max-height: 12rem;
    height: 80%;
}

.desc {
    border: 2px;
    border-radius: 5px;
    width: 75%;
    height: 50%;
    font-size: small;
    overflow-wrap:normal;
    text-align: center;
    border-color: rgb(3, 85, 3);
    border-style: solid;
    margin-bottom: 0rem;
}
.pin {
  cursor: pointer;
  max-width: unset;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
