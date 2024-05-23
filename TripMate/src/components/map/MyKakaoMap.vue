<template>
  <v-container class="container">
    <div class="content-wrapper">
      <!-- 왼쪽 컬럼: 목록을 접고 펼치는 버튼과 목록 -->
      <div class="list-wrapper" :class="{ 'closed': !isListVisible }">
        <v-infinite-scroll :height="600" :onLoad="load" @update="updateList">
          <template v-for="(place, index) in places" :key="place.id">
            <div class="place-item" @click="moveToMarker(place)">
              <div class="place-details">
                <h3>{{ place.title }}</h3>
                <p>{{ place.addr1 }}</p>
              </div>
              <v-btn icon class="favorite-icon" @click.stop="toggleFavorite(place)">
                <v-icon v-if="place.isFavorite">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider> <!-- 각 값들 간 구분선 추가 -->
          </template>
        </v-infinite-scroll>
      </div>
      <!-- 오른쪽 컬럼: 지도 -->
      <div class="map-wrapper">
        <v-btn class="toggle-button" @click="toggleListVisibility">
          {{ isListVisible ? '목록 닫기' : '목록 열기' }}
        </v-btn>
        <KakaoMap v-if="isMapVisible" :lat="center.lat" :lng="center.lng" :scrollwheel="true" :draggable="true"
          width="100%" height="600px" @onLoadKakaoMap="onLoadKakaoMap">
          <KakaoMapMarker v-for="place in places" :key="place.id" :lat="place.latitude" :lng="place.longitude" :image="{
            imageSrc: 'pin3.png',
            imageWidth: 40,
            imageHeight: 40,
            imageOption: {}
          }" :clickable="true" @on-click-kakao-map-marker="openModal(place)">
            <div>{{ place.name }}</div>
          </KakaoMapMarker>
        </KakaoMap>
        <v-btn class="bounds-button" @click="setBounds">지도 범위 재설정</v-btn>
      </div>
    </div>

    <!-- 모달  -->
    <div class="modal" v-if="modalOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <div class="favorite-button">
          <v-btn icon class="favorite-icon" @click.stop="toggleFavorite(selectedPlace)">
            <v-icon v-if="selectedPlace.isFavorite">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart-outline</v-icon>
          </v-btn>
        </div> -->
        <div class="mb-5">
        <div class="close-icon" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </div>
      </div>
      </div>
      <template v-if="isLoading">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </template>
      <template v-else>
        <div v-if="!showOverview">
          <img :src="selectedPlace.firstImage || 'noImage.png'" alt="Place Image" />
          <h2>{{ selectedPlace.title }}</h2>
          <p class="address">{{ selectedPlace.addr1 }}</p>
          <button @click="toggleOverview" style="font-weight: bold;">자세히 보기</button>
        </div>
        <div v-else class="overview">
          <p>{{ selectedPlace.overview }}</p>
          <button @click="toggleOverview" class="mt-3" style="font-weight: bold;">돌아가기</button>
        </div>
      </template>
    </div>
  </div>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { deleteHotPlace, updateHotPlace } from "@/api/hotplace";

const props = defineProps({
  places: {
    type: Array,
    default: () => []
  },
  userId : Number
});

const isListVisible = ref(true);
const isMapVisible = ref(false);
const center = ref({
  lat: 37.501328668708,
  lng: 127.03953821497
});

let map = ref(null);
const bounds = ref(null);
const initialBounds = ref(null); // 초기 bounds 저장용 변수

// 모달
const modalOpen = ref(false);
const selectedPlace = ref(null);
const isLoading = ref(false);
const showOverview = ref(false);

const openModal = (place) => {
  console.log("Open modal....place:", place);
  selectedPlace.value = null;
  isLoading.value = true;
  setTimeout(() => {
    selectedPlace.value = place;
    isLoading.value = false;
  }, 500); // 로딩 시간을 시뮬레이션하기 위해 500ms 지연
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  showOverview.value = false;
};

const toggleOverview = () => {
  showOverview.value = !showOverview.value;
};

// 목록을 열고 닫는 함수
const toggleListVisibility = () => {
  isListVisible.value = !isListVisible.value;
};

// Watch for changes in props.places
onMounted(() => {
  console.log('Props places in MyKakaoMap:', props.places);
  bounds.value = new kakao.maps.LatLngBounds();
  initialBounds.value = new kakao.maps.LatLngBounds(); // 초기 bounds 설정

  watch(
    () => props.places,
    (newPlaces) => {
      console.log('Received places:', newPlaces);
      if (newPlaces && newPlaces.length > 0) {
        center.value = {
          lat: newPlaces[0].latitude,
          lng: newPlaces[0].longitude
        };
        isMapVisible.value = true;
        bounds.value = new kakao.maps.LatLngBounds();
        newPlaces.forEach(place => {
          const point = new kakao.maps.LatLng(place.latitude, place.longitude);
          bounds.value.extend(point);
          if (initialBounds.value.isEmpty()) { // 초기 bounds가 비어있을 경우에만 추가
            initialBounds.value.extend(point);
          }
        });
      } else {
        isMapVisible.value = false;
      }
    },
    { immediate: true, deep: true }
  );
});

// Infinite Scroll 관련 로직
const items = ref(Array.from({ length: 30 }, (k, v) => v + 1));
const hasMore = ref(true);

async function api() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1));
    }, 1000);
  });
}

// 좋아요 버튼 토글 함수
const toggleFavorite = (place) => {
  if (place.isFavorite) {
    removeHotPlace(place);
  } else {
    registHotPlace(place);
  }
};

function removeHotPlace(place) {
  console.log("Delete HotPlace........userId:", props.userId, ", locationId:", place.locationId)

  deleteHotPlace(
    place.locationId,
    props.userId,
    () => {
      console.log("Success!......")
      place.isFavorite = !place.isFavorite;
    }, 
    ({ error }) => {
      console.log("Fail to Delete MyHotPlace.....", error);
    }
  )
}

function registHotPlace(place) {
  console.log("Regist HotPlace........userId:", props.userId, ", locationId:", place.locationId)

  updateHotPlace(
    place.locationId,
    props.userId,
    ({ data }) => {
      console.log("Success!......data:", data)
      place.isFavorite = !place.isFavorite;
    }, 
    ({ error }) => {
      console.log("Fail to Regist MyHotPlace.....", error);
    }
  )
}

// 클릭 시 해당 위치로 지도 이동 및 초기 bounds로 돌아가는 함수
const moveToMarker = (place) => {
  map.value.setBounds(initialBounds.value);
  center.value = {
    lat: place.latitude,
    lng: place.longitude
  };
};

// 지도 로드 시 콜백 함수
const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  console.log('kakao map loaded')
};

// 지도 범위 재설정 함수
const setBounds = () => {
  if (map.value !== null) {
    map.value.setBounds(bounds.value);
  }
};

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
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
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

.toggle-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0;
  margin: 0;
  z-index: 99;
}

.bounds-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}

.place-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: white;
}

.place-item .place-details {
  flex-grow: 1;
}

.place-item h3 {
  margin: 0;
  font-size: 16px;
}

.place-item p {
  margin: 0;
  font-size: 14px;
}

.favorite-icon {
  background: none;
  box-shadow: none;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-height: 80%;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 추가 */
  position: relative;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal-content img {
  width: 460px; /* 이미지 크기를 고정 */
  height: 280px; /* 이미지 크기를 고정 */
  object-fit: cover; /* 이미지를 확대/축소해서 부모 요소의 사이즈에 맞게 보여줌 */
  margin-bottom: 10px;
}

.address {
  margin-bottom: 10px;
}

.overview {
  text-align: center;
}
</style>
