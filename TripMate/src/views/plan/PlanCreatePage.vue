<template>
    <v-container fluid>
        <v-row justify="center" class="mb-0">
            <CategoryBar @updateSearchFilter="handleSearchFilterUpdate" />
        </v-row>
        <v-row class="ga-5">
            <div class="list-wrapper" :class="{ 'closed': !isListVisible }">
                <v-infinite-scroll :height="600" :onLoad="load" @update="updateList">
                    <template v-for="(place, index) in places" :key="place.id">
                        <div class="place-item" @click="selectPlace(place)">
                            <div class="place-details">
                                <h3>{{ place.title }}</h3>
                                <p>{{ place.addr1 }}</p>
                            </div>
                        </div>
                        <v-divider></v-divider>
                    </template>
                </v-infinite-scroll>
            </div>

            <v-col>
                <KakaoMap :lat="33.452" :lng="126.573">
                    <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" strokeColor="#C74C5E"
                        :strokeOpacity="1" strokeStyle="shortdot" />
                </KakaoMap>
            </v-col>

            <v-col class="d-flex flex-column ga-5">
                <div class="d-flex justify-space-between align-center mb-4">
                    <v-btn icon @click="prevDate">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <span>{{ date }}</span>
                    <v-btn icon @click="nextDate">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>
                <div>
                    <draggable v-model="selectedPlace" class="dragArea">
                        <template #item="{ element: place }">
                            <v-card class="custom-card" @mouseover="showDeleteButton(place)"
                                @mouseleave="hideDeleteButton(place)">
                                <v-card-title>{{ place.title }}</v-card-title>
                                <v-card-text>
                                    <div>
                                        <v-img :src="place.image" width="50" height="50"></v-img>
                                        <span>{{ place.addr1 }}</span>
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
import CategoryBar from '@/components/map/CategoryBar.vue';
import axios from 'axios';
import { KakaoMap, KakaoMapMarkerPolyline, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';
import draggable from 'vuedraggable';
import { loadPlaces } from '@/api/place';

const image = {
    imageSrc: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
    imageWidth: 48,
    imageHeight: 48
};

const searchQuery = ref('');
const placeList = ref([]);
const filteredPlaces = ref([]);
const selectedPlace = ref([]);
const places = ref([]);
const loading = ref(true); // 로딩 상태를 나타내는 변수
const isListVisible = ref(true);

// 날짜 관련 변수
const menu = ref(false);
const date = ref(new Date().toISOString().split('T')[0]);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const startDate = ref(yesterday.toISOString().split('T')[0]);

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const endDate = ref(dayAfterTomorrow.toISOString().split('T')[0]);

const placesByDate = ref({});

const formatDate = (d) => d.toISOString().split('T')[0];

// 날짜 변경 함수
const changeDate = (days) => {
    const newDate = new Date(date.value);
    newDate.setDate(newDate.getDate() + days);
    date.value = formatDate(newDate);
};

const prevDate = () => {
    changeDate(-1);
};

const nextDate = () => {
    changeDate(1);
};

const showDeleteButton = (place) => {
    place.showDelete = true;
};

const hideDeleteButton = (place) => {
    place.showDelete = false;
};

const deletePlace = (place: any) => {
    const index = selectedPlace.value.indexOf(place);
    if (index !== -1) {
        selectedPlace.value.splice(index, 1);
        updateMarkerList();
        savePlacesForDate();
    }
};

const selectPlace = (place: any) => {
    if (!selectedPlace.value.includes(place)) {
        selectedPlace.value.push(place);
        updateMarkerList();
        savePlacesForDate();
    }
};

const savePlacesForDate = () => {
    placesByDate.value[date.value] = [...selectedPlace.value];
};

watch(date, (newDate) => {
    selectedPlace.value = placesByDate.value[newDate] || [];
    updateMarkerList();
});

const updateMarkerList = () => {
    markerList.value = selectedPlace.value.map((place, index) => ({
        lat: place.latitude,
        lng: place.longitude,
        image,
        orderBottomMargin: '37px',
        order: index === 0 ? '출발' : index
    }));
};

const markerList = ref<KakaoMapMarkerListItem[]>([]);

// Axios를 사용하여 백엔드 API 호출
// const fetchPlaces = async () => {
//     try {
//         const response = await axios.get('http://localhost:8080/place');
//         if (response.status === 200) {
//             placeList.value = response.data;
//             filteredPlaces.value = placeList.value;
//         } else if (response.status === 204) {
//             placeList.value = [];
//             filteredPlaces.value = [];
//         }
//     } catch (error) {
//         console.error('Error fetching places:', error);
//     }
// };

const searchFilter = ref({
    keyword: "",
    sidoCode: 36,
    contentTypeId: 14,
    latitude: 37.501328668708,
    longitude: 127.03953821497
});

const getPlaces = () => {
    console.log("Load Places.......searchFilter:", searchFilter.value);
    loadPlaces(
        searchFilter.value,
        ({ data }) => {
            console.log("Raw API Response:", data);
            places.value = data;
            loading.value = false; // 데이터 로드가 완료되면 로딩 상태 변경
            console.log("Processed Places Data:", places.value);

        },
        (err) => {
            console.log("Fail to Load Places........", err);
            places.value = [];
            loading.value = false; // 에러 발생 시 로딩 상태 변경
        }
    );
};

const handleSearchFilterUpdate = (newSearchFilter) => {
    searchFilter.value = {
        ...searchFilter.value,
        ...newSearchFilter
    };
    loading.value = true; // 데이터 로드 시작 시 로딩 상태 변경
    getPlaces();
};

const items = ref(Array.from({ length: 30 }, (k, v) => v + 1));
const hasMore = ref(true);

async function api() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1));
        }, 1000);
    });
}

async function load({ done }) {
    // API 호출
    if (hasMore.value) {
        const res = await api();
        if (res.length === 0) {
            hasMore.value = false;
        } else {
            items.value.push(...res);
        }
    }
    done('ok');
}

const updateList = () => {
    console.log('List updated!');
};

getPlaces();

// fetchPlaces();

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
