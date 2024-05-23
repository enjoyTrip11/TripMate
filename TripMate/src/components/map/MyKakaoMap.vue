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
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <KakaoMap v-else-if="isMapVisible" :center="center" :scrollwheel="false" :draggable="true" width="100%" height="600px">
          <KakaoMapMarker
            v-for="place in places" 
            :key="place.id" 
            :lat="place.latitude" 
            :lng="place.longitude"
          >
            <div>{{ place.title }}</div>
          </KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const props = defineProps({
  places: {
    type: Array,
    default: () => []
  }
});

const isListVisible = ref(true);
const isMapVisible = ref(false);
const isLoading = ref(true); // 로딩 상태 추가
const center = ref({
  lat: 37.501328668708,
  lng: 127.03953821497
});

// 목록을 열고 닫는 함수
const toggleListVisibility = () => {
  isListVisible.value = !isListVisible.value;
};

// Watch for changes in props.places
watch(
  () => props.places,
  (newPlaces) => {
    console.log('Received places:', newPlaces);
    if (newPlaces && newPlaces.length > 0) {
      center.value = {
        lat: newPlaces[0].latitude || 37.501328668708, // 기본 위치로 대체
        lng: newPlaces[0].longitude || 127.03953821497 // 기본 위치로 대체
      };
      isMapVisible.value = true;
      isLoading.value = false; // 로딩 완료
    } else {
      isMapVisible.value = false;
      isLoading.value = false; // 로딩 완료
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  console.log('Props places in MyKakaoMap:', props.places);
  // 카카오맵 API가 로드되었을 때 로딩 상태를 false로 설정
  window.kakao && window.kakao.maps ? isLoading.value = false : loadKakaoMapApi();
});

function loadKakaoMapApi() {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY&autoload=false`;
  script.onload = () => {
    window.kakao.maps.load(() => {
      isLoading.value = false;
    });
  };
  document.head.appendChild(script);
}

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

// 좋아요 버튼 토글 함수
const toggleFavorite = (place) => {
  place.isFavorite = !place.isFavorite;
};

// 클릭 시 해당 위치로 지도 이동
const moveToMarker = (place) => {
  center.value = {
    lat: place.latitude,
    lng: place.longitude
  };
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
  flex-direction: column;
  width: 300px;
  background-color: #f5f5f5; /* 배경색 통일 */
}

.list-wrapper.closed {
  display: none;
}

.map-wrapper {
  position: relative;
  height: 600px;
  width: calc(100% - 300px);
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-button {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
}

.place-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: white; /* 배경색 통일 */
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
</style>
