<template>
    <v-container fluid>
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
    </v-container>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch);

const emit = defineEmits(['search']);

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

</script>

<style scoped>
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