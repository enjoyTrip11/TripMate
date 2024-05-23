<template>
  <v-container class="container">
    <div class="content-wrapper">
      <!-- 왼쪽 컬럼: 목록을 접고 펼치는 버튼과 목록 -->
      <div class="list-wrapper" :class="{ 'closed': !isListVisible }">
        <v-infinite-scroll :height="600" :onLoad="load" @update="updateList">
          <template v-for="(item, index) in places" :key="index">
            <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
              {{ index }} : {{ item.title }}
            </div>
          </template>
        </v-infinite-scroll>
        <!-- 목록을 열고 닫는 버튼 -->
      </div>
      <!-- 오른쪽 컬럼: 지도 -->
      <div class="map-wrapper">
        <v-btn class="toggle-button" @click="toggleListVisibility">
          {{ isListVisible ? '목록 닫기' : '목록 열기' }}
        </v-btn>
        <KakaoMap v-if="isMapVisible" :lat="center.lat" :lng="center.lng" :draggable="true" width="100%" height="600px">
          <KakaoMapMarker
            v-for="place in places" 
            :key="place.id" 
            :lat="place.latitude" 
            :lng="place.longitude"
          >
            <div>{{ place.name }}</div>
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
        lat: newPlaces[0].latitude,
        lng: newPlaces[0].longitude
      };
      isMapVisible.value = true;
    } else {
      isMapVisible.value = false;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  console.log('Props places in MyKakaoMap:', props.places);
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
  /* width: 100%; */
  padding: 0;
  display: flex; /* 리스트 내부의 요소들을 가로 정렬하기 위해 추가 */
}

.list-wrapper.closed {
  /* width: 10px; */
  display: none;
}

.map-wrapper {
  position: relative;
  height: 600px;
  width: 1440px;
}

.toggle-button {
  position: absolute;
  top: 10px;
  left: 10px;
  align-self: flex-end; /* 목록 오른쪽 끝에 배치 */
  padding: 0;
  margin: 0;
  z-index: 99;
}
</style>