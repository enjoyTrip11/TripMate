<template>
    <v-container fluid>
      <v-row>
        <div class="category-bar">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="category-item"
            @click="selectCategory(category.id)"
          >
            <div class="cat">
              <font-awesome-icon :icon="category.icon" class="category-icon" />
              <div class="category-text">{{ category.name }}</div>
            </div>
          </div>
          <div v-if="index < categories.length - 1" class="category-divider"></div>
        </div>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  import {
    faTh,
    faLandmark,
    faBuilding,
    faCalendarAlt,
    faRoute,
    faRunning,
    faHotel,
    faShoppingBag,
    faUtensils
  } from '@fortawesome/free-solid-svg-icons';
  
  library.add(
    faTh,
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
  
  const selectCategory = (categoryId) => {
    emit('categorySelected', categoryId);
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
    margin-bottom: 10px; /* 아래 여백 추가 */
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
  }
  
  .v-container--fluid {
    width: 1440px;
  }
  </style>
  