<template>
    <v-container fluid>
        <!-- 계획 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">{{ editedText[0] }}</h1>
                <hr>
            </v-col>
        </v-row>
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

            <v-col class="map">
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

        <!-- 작성 버튼 -->
        <v-row justify="end" class="fixed-bottom" style="position: fixed; bottom: 20px; right: 20px;">
            <v-col cols="6" class="mr-2">
                <v-btn class="ma-2" icon="mdi-pencil" color="primary" style="width: 60px; height: 60px;"
                    @click="toggleIcons"></v-btn>
            </v-col>
        </v-row>

        <!-- 확인/편집 다이얼로그 -->
        <v-dialog v-model="confirmEditDialog" max-width="500">
            <v-card>
                <v-card-title>텍스트 확인 및 편집</v-card-title>
                <v-card-text>
                    <v-row v-if="editing !== -1">
                        <v-col cols="12">
                            <v-text-field v-model="editedText[editing]" label="텍스트를 입력하세요"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="confirmEdit">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 추가된 버튼들 -->
        <v-row v-if="showIcons" justify="end" class="fixed-bottom" style="position: fixed; bottom: 120px; width: 100%;">
            <v-col v-for="(icon, index) in icons" :key="index" cols="6" class="mr-2">
                <v-row>
                    <v-col cols="12">
                        <v-btn class="ma-2" :icon="icon" color="secondary" style="width: 60px; height: 60px;"
                            @click="handleButtonClick(index)"></v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CategoryBar from '@/components/map/CategoryBar.vue';
import axios from 'axios';
import { KakaoMap, KakaoMapMarkerPolyline, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';
import draggable from 'vuedraggable';
import { loadPlaces } from '@/api/place';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const image = {
    imageSrc: 'https://vue3-kakao-maps.netlify.app/images/redMarker.png',
    imageWidth: 48,
    imageHeight: 48
};

const tripId = route.params.planId;
console.log("!!!!!!!!!!!!!!!!!!!!!!", route);

const trip = ref(null);
const plans = ref([]);
const invites = ref([]);

const findPlaceById = async (locationId) => {
    try {
        // 서버에 장소 정보를 요청하는 API 호출
        const response = await axios.get(`http://localhost:8080/place/${locationId}`);
        const place = response.data;
        return place;
    } catch (error) {
        console.error('장소 정보를 가져오는 데 실패했습니다:', error);
        return null;
    }
};

const loadTripData = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/trip/${tripId}`);
        const { trip: tripData, plans: planData, invites: inviteData } = response.data;
        trip.value = tripData;
        plans.value = planData;
        invites.value = inviteData;
        console.log(tripData);
        console.log(planData);
        console.log(inviteData);
        editedText.value[0] = trip.value.title;
        editedText.value[1] = trip.value.place;
        editedText.value[2] = trip.value.startDate + " ~ " + trip.value.endDate;
        date.value = new Date(trip.value.startDate).toISOString().split('T')[0];
        planData.forEach(planSaveDto => {
            const { date, locationId, planOrder } = planSaveDto;
            // 해당 날짜가 이미 placesByDate에 있는지 확인
            if (!placesByDate.value[date]) {
                // 해당 날짜가 없으면 빈 배열로 초기화
                placesByDate.value[date] = [];
            }
            const place = findPlaceById(locationId);
            findPlaceById(locationId).then(place => {
                if (place) {
                    placesByDate.value[date][planOrder] = place;
                } else {
                    console.log(`Place with locationId ${locationId} not found.`);
                }
            }).catch(error => {
                console.error('Error retrieving place:', error);
            });
        });
    } catch (error) {
        console.error('Error loading trip:', error);
    }
};

onMounted(loadTripData);

const searchQuery = ref('');
const placeList = ref([]);
const filteredPlaces = ref([]);
const selectedPlace = ref([]);
const places = ref([]);
const loading = ref(true); // 로딩 상태를 나타내는 변수
const isListVisible = ref(true);

// 날짜 관련 변수
const date = ref();

const showIcons = ref(false);
const icons = ref(['mdi-format-title', 'mdi-map-marker', 'mdi-calendar', 'mdi-account-group', 'mdi-content-save']);

const editing = ref(-1); // 현재 편집 중인 버튼의 인덱스
const editedText = ref(['', '', '', '']); // 편집된 텍스트 배열
const confirmEditDialog = ref(false); // 확인/편집 다이얼로그 표시 여부

const toggleIcons = () => {
    showIcons.value = !showIcons.value;
};

const handleButtonClick = (index) => {
    if (index < 4) {
        openConfirmEditDialog(index);
    } else if (index == 4) {
        saveFunction();
    }
};

const saveFunction = () => {
    // 선택한 날짜 범위 파싱
    const dates = editedText.value[2].split(' ~ ');
    const startDate = dates[0];
    const endDate = dates[1];

    // 여행 정보를 담은 객체 생성
    const tripUpdateDto = {
        title: editedText.value[0],
        place: editedText.value[1],
        startDate: startDate,
        endDate: endDate
    };

    // 초대할 친구 목록을 담은 객체 생성
    const inviteSaveDtoList = null;

    const planSaveDtoList = [];

    // placesByDate 객체의 각 날짜에 대해 반복
    for (const dateKey in placesByDate.value) {
        // 날짜별로 저장된 장소 목록 가져오기
        const places = placesByDate.value[dateKey];

        // 장소 목록을 순회하면서 planSaveDto 객체 생성
        places.forEach((place, index) => {
            const planSaveDto = {
                tripId: 0, // 여행 ID는 생성 후에 할당될 것으로 가정하고 0으로 설정
                locationId: place.locationId, // 장소의 고유 ID 사용
                date: dateKey, // 날짜 값 사용
                planOrder: index // 장소 목록의 인덱스 사용
            };

            // 생성된 planSaveDto를 planSaveDtoList에 추가
            planSaveDtoList.push(planSaveDto);
        });
    }
    console.log(planSaveDtoList);

    // axios를 사용하여 POST 요청 보내기
    axios.put('http://localhost:8080/trip/18', {
        tripUpdateDto,
        inviteSaveDtoList,
        planSaveDtoList
    })
        .then(response => {
            // 요청 성공 시 처리할 작업
            console.log('여행 생성 성공');
            router.push('/planList');
        })
        .catch(error => {
            // 요청 실패 시 처리할 작업
            console.error('서버 에러:', error);
        });
};

const openConfirmEditDialog = (index) => {
    editing.value = index;
    editedText.value[index] = `${editedText.value[index]}`;
    confirmEditDialog.value = true; // 확인/편집 다이얼로그 열기
};

const confirmEdit = () => {
    // 확인 버튼을 누르면 편집한 텍스트를 저장하고 다이얼로그를 닫음
    console.log(`Button ${editing.value}의 텍스트: ${editedText.value[editing.value]}`);
    confirmEditDialog.value = false;
};
const placesByDate = ref({});

const formatDate = (d) => d.toISOString().split('T')[0];

// 날짜 변경 함수
const changeDate = (days) => {
    const startDate = new Date(editedText.value[2].split(' ~ ')[0]);
    const endDate = new Date(editedText.value[2].split(' ~ ')[1]);
    const newDate = new Date(date.value);
    newDate.setDate(newDate.getDate() + days);

    // 변경된 날짜가 유효한지 확인
    if (newDate >= startDate && newDate <= endDate) {
        date.value = formatDate(newDate);
    }
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
    console.log(placesByDate);
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
watch(selectedPlace, savePlacesForDate);
watch(editedText, (newValue) => { });
</script>

<style>
.ga-5 {
    width: 100%;
}

.map {
    position: relative;
    width: 800px;
}

.list-wrapper {
  overflow: hidden;
  padding: 0;
  display: flex;
}

.list-wrapper.closed {
  display: none;
}

.map-wrapper {
  flex-grow: 1;
  position: relative;
  height: 600px;
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

.px-0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 43%;
    width: 100%;
}
</style>
