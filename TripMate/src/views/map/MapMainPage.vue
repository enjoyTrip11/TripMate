<template>
    <v-container fluid>
        <!-- 여행지 정보 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">여행지 정보</h1>
                <hr>
            </v-col>
        </v-row>
         <!-- SearchBar 컴포넌트 가운데 정렬 -->
         <v-row justify="center" class="mb-0">
                <!-- <SearchBar class="searchBar" /> -->
                <CategoryBar />
        </v-row>
        <!-- MyKakaoMap 컴포넌트 -->
        <v-row  class="mt-0">
                <MyKakaoMap class="map" />
        </v-row>
    </v-container>
</template>

<script setup>
import MyKakaoMap from '@/components/map/MyKakaoMap.vue';
import CategoryBar from '@/components/map/CategoryBar.vue'

import { ref } from 'vue';
import { loadPlaces } from '@/api/place';

const places = ref([])

const searchFilter = ref({
  keyword: "",
  sidoCode: 36,
  contentTypeId: 14,
  latitude: 37.501328668708,
  longitude: 127.03953821497
})

function getPlaces() {
    console.log("Load Places.......searchFilter:", searchFilter.value)
    loadPlaces(
        searchFilter.value,
        ({data}) => {
            places.value = data.place
            console.log("Success!......", data)
        },
        ( err ) => {
            console.log("Fail to Load Places........", err)
        }
    )
}

getPlaces()

</script>

<style scoped>
.v-container--fluid {
    max-width: 100%;
}
</style>
