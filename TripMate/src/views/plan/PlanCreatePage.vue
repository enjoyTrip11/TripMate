<template>
    <v-container fluid>
        <v-row class="ga-5">
            <!-- 왼쪽 검색창 -->
            <v-col>
                <v-text-field v-model="searchQuery" label="Search Places" @input="filterPlaces"></v-text-field>
                <v-list>
                    <v-list-item v-for="place in filteredPlaces" :key="place.title" @click="selectPlace(place)">
                        <div class="d-flex">
                            <v-list-item-avatar style="margin-right: 15px;">
                                <v-img :src="place.image" width="50" height="50"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ place.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ place.description }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </div>
                    </v-list-item>
                </v-list>
            </v-col>

            <!-- 오른쪽 카카오맵 -->
            <v-col>
                <KakaoMap :lat="33.452" :lng="126.573">
                    <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" strokeColor="#C74C5E"
                        :strokeOpacity="1" strokeStyle="shortdot" />
                </KakaoMap>
            </v-col>

            <!-- 선택된 장소 목록 -->
            <v-col class="d-flex flex-column ga-5">
                <div>
                    <draggable v-model="selectedPlace" class="dragArea">
                        <template #item="{ element: place }">
                            <v-card class="custom-card" @mouseover="showDeleteButton(place)"
                                @mouseleave="hideDeleteButton(place)">
                                <v-card-title>Selected Place</v-card-title>
                                <v-card-text>
                                    <div>
                                        <v-img :src="place.image" width="50" height="50"></v-img>
                                        <span>{{ place.title }}</span>
                                    </div>
                                    <div>{{ place.description }}</div>
                                    <v-btn icon class="delete-button" @click="deletePlace(place)"
                                        v-show="place.showDelete">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </template>
                    </draggable>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { KakaoMap, KakaoMapMarkerPolyline, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';
import draggable from 'vuedraggable';

const image = {
    imageSrc: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
    imageWidth: 48,
    imageHeight: 48
};

const searchQuery = ref('');
const placeList = ref([]);
const filteredPlaces = ref([]);
const selectedPlace = ref([]);

const showDeleteButton = (place) => {
    place.showDelete = true;
};

const hideDeleteButton = (place) => {
    place.showDelete = false;
};

const deletePlace = (place) => {
    const index = selectedPlace.value.indexOf(place);
    if (index !== -1) {
        selectedPlace.value.splice(index, 1);
        markerList.value.splice(index, 1);
        updateMarkerList();
    }
};

const filterPlaces = () => {
    filteredPlaces.value = placeList.value.filter(place =>
        place.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};

const updateMarkerList = () => {
    markerList.value = selectedPlace.value.map((place, index) => ({
        lat: place.lat,
        lng: place.lng,
        image,
        orderBottomMargin: '37px',
        order: index === 0 ? '출발' : index
    }));
};

const selectPlace = (place) => {
    selectedPlace.value.push(place);
    updateMarkerList();
};

const markerList: Ref<KakaoMapMarkerListItem[]> = ref([]);

// Axios를 사용하여 백엔드 API 호출
const fetchPlaces = async () => {
    try {
        const response = await axios.get('http://localhost:8080/place');
        if (response.status === 200) {
            placeList.value = response.data;
            filteredPlaces.value = placeList.value;
        } else if (response.status === 204) {
            placeList.value = [];
            filteredPlaces.value = [];
        }
    } catch (error) {
        console.error('Error fetching places:', error);
    }
};

fetchPlaces();

watch(selectedPlace, updateMarkerList);
</script>

<style>
.ga-5 {
    width: 100%;
}

.dragArea {
    list-style-type: none;
    padding: 0;
}

.placeItem {
    border: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 10px;
}

.custom-card {
    margin-bottom: 10px;
}

.delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.custom-card:hover .delete-button {
    opacity: 1;
}
</style>
