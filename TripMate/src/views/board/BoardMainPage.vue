<template>
    <v-container fluid>
        <!-- 게시판 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">게시판</h1>
                <hr>
            </v-col>
        </v-row>

        <v-row>
            <!-- 카테고리 목록 -->
            <v-col cols="3">
                <v-list dense>
                    <v-list-item v-for="(category, index) in categories" :key="index" @click="selectCategory(category)"
                        :class="{ 'selected-category': selectedCategory === category }">
                        <v-list-item-content>
                            <v-list-item-title :class="{ 'font-weight-bold': selectedCategory === category }">{{
                                category }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>

            <!-- 우측 메인 페이지 -->
            <v-col cols="9" class="px-0" style="max-height: 500px; overflow-y: auto;">
                <!-- 검색 바 -->
                <!-- <v-col cols="6">
                        <v-text-field v-model="search" label="검색" dense outlined class="custom-search" solo-inverted
                            append-icon="mdi-magnify" max-width="400"></v-text-field>
                    </v-col>

                    <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template> -->
                    
                <!-- 게시물 리스트 -->
                <v-list>
                    <v-list-item v-for="(post, index) in filteredPosts" :key="index" class="mb-6">
                        <v-list-item-content>
                            <router-link :to="{ name: 'boardDetail', params: { boardId: post.boardId }}" style="text-decoration: none; color:black;">
                                <v-list-item-title class="font-weight-bold">
                                    {{ post.title }}
                                </v-list-item-title>
                            </router-link>
                            <span class="text-caption" style="float: right;">{{ formatDate(post.modifyDate) }}</span>
                            <v-list-item-subtitle class="mb-2">{{ post.category }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ post.contents }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <v-btn-toggle v-model="toggle" dense>
            <v-btn v-for="(item, index) in searchOptions" :key="index" @click="toggleSearchOption(item)">
                {{ item.label }}
            </v-btn>
        </v-btn-toggle>

        <!-- 작성 버튼 -->
        <v-row justify="end" class="fixed-bottom" style="position: fixed; bottom: 20px; right: 20px;">
            <v-col cols="6" class="mr-2">
                <router-link :to="{ name: 'boardCreate' }">
                    <v-btn class="ma-2" icon="mdi-pencil" color="primary" style="width: 60px; height: 60px;"> </v-btn>
                </router-link>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>
import { loadBoard } from "@/api/board"
import { ref, computed } from 'vue'

const categories = ['전체보기', '공지사항', '여행 계획 공유', '여행 후기', '소통']
const selectedCategory = ref('전체보기')
const search = ref('')
const posts = ref([])
const params = ref({
    category: "",
    userId: 0,
    keyword: ""
})

function getPosts() {
    loadBoard(
        params.value,
        ({ data }) => {
            console.log("loadBoard.........", data)
            posts.value = data
        },
        (error) => {
            console.log(error)
        }
    )
}
getPosts();

const filteredPosts = computed(() => {
    let filtered = posts.value
    if (selectedCategory.value !== '전체보기') {
        filtered = filtered.filter(post => post.category === selectedCategory.value)
    }
    if (search.value) {
        filtered = filtered.filter(post =>
            post.title.includes(search.value) ||
            post.contents.includes(search.value)
        )
    }
    return filtered
})

function selectCategory(category) {
    selectedCategory.value = category
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('ko-KR', options)
}

</script>

<style scoped>
.mb-10 {
    margin-bottom: 10px;
}

.selected-category {
    background-color: #E3F2FD !important;
    /* 선택된 카테고리 배경색 지정 */
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
