<template>
    <v-container fluid>
        <div class="mb-10"></div>
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
                            <v-list-item-title>{{ category }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>

            <!-- 우측 메인 페이지 -->
            <v-col cols="9" class="px-0" style="max-height: 500px; overflow-y: auto;">
                <!-- 선택된 카테고리명 표시 -->
                <v-col>
                    <h2 v-if="selectedCategory">{{ selectedCategory }}</h2>
                </v-col>
                <!-- 게시물 리스트 -->
                <v-list>
                    <v-list-item v-for="(post, index) in filteredPosts" :key="index" class="mb-6">
                        <v-list-item-content>
                            <router-link :to="{ name: 'boardDetail' }" style="text-decoration: none; color:black;">
                                <v-list-item-title class="font-weight-bold">
                                    {{ post.title }}
                                </v-list-item-title>
                            </router-link>
                            <span class="text-caption" style="float: right;">{{ post.date }}</span>
                            <v-list-item-subtitle class="mb-2">{{ post.category }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
                            
                        </v-list-item-content>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <!-- 검색 바와 작성 버튼 -->
        <v-row justify="center" class="fixed-bottom">
            <v-col>
                <v-text-field v-model="search" label="검색" dense outlined class="custom-search" solo-inverted append-icon="mdi-magnify" max-width="400"></v-text-field>
            </v-col>
            <v-col>
                <router-link :to="{name: 'boardCreate'}">
                <v-btn color="primary">작성</v-btn>
            </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            categories: ['전체보기', '공지사항', '여행 계획 공유', '여행 후기'],
            selectedCategory: '공지사항', // 디폴트는 공지사항
            search: '',
            posts: [
                { title: 'Post 1', category: '공지사항', content: 'Content of post 1', date: '2024-05-01' },
                { title: 'Post 2', category: '공지사항', content: 'Content of post 2', date: '2024-05-02' },
                { title: 'Post 3', category: '여행 계획 공유', content: 'Content of post 3', date: '2024-05-03' },
                { title: 'Post 4', category: '여행 후기', content: 'Content of post 4', date: '2024-05-04' },
                { title: 'Post 5', category: '여행 후기', content: 'Content of post 5', date: '2024-05-05' },
                { title: 'Post 6', category: '공지사항', content: 'Content of post 6', date: '2024-05-06' },
            ]
        };
    },
    computed: {
        filteredPosts() {
            if (!this.selectedCategory || this.selectedCategory == '전체보기') return this.posts;
            return this.posts.filter(post => post.category === this.selectedCategory);
        }
    },
    methods: {
        selectCategory(category) {
            this.selectedCategory = category;
        }
    }
};
</script>

<style scoped>
.mb-10 {
    margin-bottom: 10px;
}

.selected-category {
    background-color: #E3F2FD !important; /* 선택된 카테고리 배경색 지정 */
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
