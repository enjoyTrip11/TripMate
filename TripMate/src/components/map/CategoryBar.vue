<template>
    <v-container fluid>
      <v-row>
        <v-row class="container">
            <div class="search-bar">
                <select v-model="selectedRegion" @change="onSearch">
                    <option disabled value="">지역 선택</option>
                    <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
                </select>
                <div class="divider"></div>
                <input type="text" v-model="keyword" @input="onSearch" placeholder="키워드를 입력하세요" />
                <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
            </div>
        </v-row>
        <v-divider></v-divider>

        <div class="category-bar">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="category-item"
            @click="selectCategory(category.id)"
            :class="{ 'active': selectedCategory === category.id }"
          >
            <div class="cat">
              <font-awesome-icon :icon="category.icon" class="category-icon" />
              <div class="category-text">{{ category.name }}</div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { defineEmits, ref } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  

const regions = [
    { id: 1, name: '서울' },
    { id: 2, name: '인천' },
    { id: 3, name: '대전' },
    { id: 4, name: '대구' },
    { id: 5, name: '광주' },
    { id: 6, name: '부산' },
    { id: 7, name: '울산' },
    { id: 8, name: '세종특별자치시' },
    { id: 31, name: '경기도' },
    { id: 32, name: '강원도' },
    { id: 33, name: '충청북도' },
    { id: 34, name: '충청남도' },
    { id: 35, name: '경상북도' },
    { id: 36, name: '경상남도' },
    { id: 37, name: '전라북도' },
    { id: 38, name: '전라남도' },
    { id: 39, name: '제주도' }
];

const selectedRegion = ref('');
const keyword = ref('');

const onSearch = () => {
    emit('search', {
        region: selectedRegion.value,
        keyword: keyword.value
    });
};



  import {
    faTh,
    faLandmark,
    faBuilding,
    faCalendarAlt,
    faSearch,
    faRoute,
    faRunning,
    faHotel,
    faShoppingBag,
    faUtensils
  } from '@fortawesome/free-solid-svg-icons';
  
  library.add(
    faTh,
    faSearch,
    faLandmark,
    faBuilding,
    faCalendarAlt,
    faRoute,
    faRunning,
    faHotel,
    faShoppingBag,
    faUtensils
  );
  
  const emit = defineEmits(['categorySelected']);
  
  const categories = [
    { id: 0, name: '전체보기', icon: 'fa-th' }, 
    { id: 12, name: '관광지', icon: 'landmark' },
    { id: 14, name: '문화시설', icon: 'building' },
    { id: 15, name: '축제공연행사', icon: 'calendar-alt' },
    { id: 25, name: '여행코스', icon: 'route' },
    { id: 28, name: '레포츠', icon: 'running' },
    { id: 32, name: '숙박', icon: 'hotel' },
    { id: 38, name: '쇼핑', icon: 'shopping-bag' },
    { id: 39, name: '음식점', icon: 'utensils' }
  ];
  
  const selectedCategory = ref(0);
  
  const selectCategory = (categoryId) => {
    emit('categorySelected', categoryId);
    selectedCategory.value = categoryId;
  };
  </script>
  
  <style scoped>
  .category-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
  }
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    flex-basis: calc(25% - 10px); /* 각 항목이 25%의 너비를 가지도록 설정 */
  }
  
  .category-icon {
    font-size: 24px;
    color: #555;
  }
  
  .category-text {
    margin-top: 5px;
    font-size: 14px;
    color: #555;
  }
  
  .category-divider {
    width: 1px;
    height: 24px; /* 구분선 세로 길이 조정 */
    background-color: #ccc;
  }
  
  .cat {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  
  /* 선택된 카테고리 스타일 */
  .active .category-icon,
  .active .category-text {
    color: rgb(107, 180, 223); /* 아이콘과 텍스트 파란색으로 변경 */
    font-weight: bold; /* 텍스트 굵게 설정 */
  }
  
  .container {
    justify-content: center;
    margin-bottom: 4px;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    border-radius: 25px;
    background-color: #fff;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.search-bar select,
.search-bar input {
    padding: 8px;
    font-size: 16px;
    border: none;
    outline: none;
    background: transparent;
}

.search-bar input {
    flex: 1;
}

.search-icon {
    color: #888;
}

.divider {
    width: 1px;
    height: 24px;
    background-color: #ccc;
}
  </style>
  