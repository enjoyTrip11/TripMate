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
                <div>
                    <v-btn class="demo-button" @click="addMarker">마커 추가하기</v-btn>
                    <v-btn class="demo-button" @click="deleteMarker">마커 삭제하기</v-btn>
                </div>
            </v-col>

            <!-- 선택된 장소 목록 -->
            <v-col class="d-flex flex-column ga-5">
                <template v-for="(place, index) in selectedPlace" :key="index">
                    <div>
                        <v-card>
                            <v-card-title>Selected Place</v-card-title>
                            <v-card-text>
                                <div>
                                    <v-img :src="place.image" width="50" height="50"></v-img>
                                    <span>{{ place.title }}</span>
                                </div>
                                <div>{{ place.description }}</div>
                            </v-card-text>
                        </v-card>
                    </div>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarkerPolyline, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';

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

const filterPlaces = () => {
    filteredPlaces.value = placeList.filter(place =>
        place.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};

// const selectPlace = (place) => {
//   selectedPlace.value = place;
// };

const selectPlace = (place) => {
    const newMarker = {
        lat: place.lat,
        lng: place.lng,
        image,
        orderBottomMargin: '37px'
    };
    markerList.value.push(newMarker);
    selectedPlace.value.push(place);
    console.log(selectPlace.length);
};

const markerList: Ref<KakaoMapMarkerListItem[]> = ref([
    { lat: 33.4509, lng: 126.571, image, orderBottomMargin: '37px', order: '출발' }
]);

// 마커 추가하기 버튼의 함수입니다
const addMarker = (): void => {
    markerList.value.push({
        lat: 33.4509 + Math.random() * 0.003,
        lng: 126.571 + Math.random() * 0.003,
        image,
        orderBottomMargin: '37px'
    });
};

// 마커 삭제하기 버튼의 함수입니다
const deleteMarker = (): void => {
    markerList.value.pop();
};
</script>
