<template>
    <v-container>
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
import { KakaoMap, KakaoMapMarkerPolyline, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';
import draggable from 'vuedraggable';

const image = {
    imageSrc: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
    imageWidth: 48,
    imageHeight: 48
};

const placeList = [
    {
        lat: 33.4509,
        lng: 126.571,
        image: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
        title: 'Place 1',
        description: 'Description for Place 1'
    },
    {
        lat: 33.451,
        lng: 126.572,
        image: 'https://example.com/image2.jpg',
        title: 'Place 2',
        description: 'Description for Place 2'
    },
    {
        lat: 33.452,
        lng: 126.573,
        image: 'https://example.com/image3.jpg',
        title: 'Place 3',
        description: 'Description for Place 3'
    },
    {
        lat: 33.4518,
        lng: 126.5725,
        image: 'https://example.com/image4.jpg',
        title: 'Place 4',
        description: 'Description for Place 4'
    },
    {
        lat: 33.4512,
        lng: 126.571,
        image: 'https://example.com/image1.jpg',
        title: 'Place 5',
        description: 'Description for Place 5'
    },
    {
        lat: 33.451,
        lng: 126.576,
        image: 'https://example.com/image2.jpg',
        title: 'Place 6',
        description: 'Description for Place 6'
    },
    {
        lat: 33.452,
        lng: 126.572,
        image: 'https://example.com/image3.jpg',
        title: 'Place 7',
        description: 'Description for Place 7'
    },
    {
        lat: 33.4518,
        lng: 126.5725,
        image: 'https://example.com/image4.jpg',
        title: 'Place 8',
        description: 'Description for Place 8'
    }
];

const searchQuery = ref('');
const filteredPlaces = ref(placeList);
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
    filteredPlaces.value = placeList.filter(place =>
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

watch(selectedPlace, updateMarkerList);

</script>

<style>
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
