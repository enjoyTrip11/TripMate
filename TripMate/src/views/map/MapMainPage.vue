<template>
    <v-container fluid>
      <!-- 여행지 정보 제목 -->
      <!-- <v-row justify="center" class="mb-4">
        <v-col cols="auto">
          <h1 class="display-1">여행지 정보</h1>
          <hr>
        </v-col>
      </v-row> -->
      <!-- SearchBar 컴포넌트 가운데 정렬 -->
      <v-row justify="center" class="mb-0">
        <CategoryBar @updateSearchFilter="handleSearchFilterUpdate" />
      </v-row>
      <!-- MyKakaoMap 컴포넌트 -->
      <v-row class="mt-0">
        <div v-if="loading">
          <!-- 로딩 상태를 나타내는 부분 -->
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
        <div  v-else class="wrapper">
          <MyKakaoMap class="map" :places="places" :userId="userId" />
        </div>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import MyKakaoMap from '@/components/map/MyKakaoMap.vue';
  import CategoryBar from '@/components/map/CategoryBar.vue';
  
  import { ref } from 'vue';
  import { loadPlaces } from '@/api/place';
  
  const userId = 1; // TODO: 아이디 바꾸기 
  const places = ref([]);
  const loading = ref(true); // 로딩 상태를 나타내는 변수
  
  const searchFilter = ref({
    userId: userId,
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
        places.value = data
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
  
  getPlaces();
  </script>
  
  <style scoped>
  .v-container--fluid {
    max-width: 100%;
  }

  .map {
    width: 100%;
  }

  .wrapper {
    width: 100%;
  }
  </style>
  