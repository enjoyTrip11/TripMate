<template>
    <v-container fluid class="px-10">
        <div class="mb-10"></div>
        <!-- 게시판 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">게시물 상세</h1>
                <hr>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <!-- 게시물 제목-->
                    <v-card-title class="d-flex align-center pb-4">
                        <span class="mr-4 display-1 text-h5">{{ post.title }}</span>
                    </v-card-title>
                    <!-- 작성장 정보 및 게시물 내용 -->
                    <v-card-text>
                        <v-row align="center" class="mt-1 mb-4">
                            <v-avatar size="40" class="mr-2 ml-2">
                                <img class="img-fluid" src="@/assets/img/noProfile.png" style="width: 100%">
                            </v-avatar>
                            <span>{{ post.author }}</span> <!-- 유저 이름 -->
                        </v-row>
                        <v-divider></v-divider>
                        <div class="mt-4" style="height: 40vh; max-height: 70vh; overflow-y: auto;">
                            <span class="text-h6" style="font-weight: 200;">{{ post.content }}</span>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>

                    <!-- 댓글 -->
                    <v-card-title>댓글</v-card-title>
                    <v-card-text>
                        <!-- 댓글 목록 표시 -->
                        <v-list>
                            <v-list-item v-for="(comment, index) in comments" :key="index">
                                <v-row align="center" class="mb-2"> <!-- 여백 조정 -->
                                    <v-col cols="auto">
                                        <v-list-item-avatar>
                                            <v-avatar size="30">
                                                <img src="@/assets/img/noProfile.png" alt="User Profile Picture"
                                                    style="width: 100%">
                                            </v-avatar>
                                        </v-list-item-avatar>
                                    </v-col>
                                    <h3>{{ comment.user_name }}</h3>
                                    <v-col cols="12">
                                        <h2 style="font-weight: 200;">{{ comment.content }}</h2>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>

                        <!-- 댓글 입력 폼 -->
                        <v-row align="center">
                            <v-col cols="10">
                                <v-text-field v-model="newComment" label="댓글 작성" outlined></v-text-field>
                            </v-col>
                            <v-col cols="2" class="d-flex align-center">
                                <v-btn @click="addComment" color="primary">작성</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>

        <!-- 유사한 게시글 -->
        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <v-card-title>추천 게시글</v-card-title>
                    <v-card-text style="max-height: 40vh; overflow-y: auto;">
                        <v-row>
                            <v-col v-for="(similarPost, index) in similarPosts" :key="index" cols="4">
                                <v-card class="mx-auto" max-width="344" :title="similarPost.title"
                                    :subtitle="similarPost.author" link></v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" class="d-flex justify-end">
                <v-btn @click="editPost" color="success" class="mr-2">수정</v-btn>
                <v-btn @click="deletePost" color="error" class="mr-2">삭제</v-btn>
                <router-link :to="{name : 'board'}" >
                <v-btn color="info">목록</v-btn>
                 </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                content: '',
                author: '',
            },
            comments: [], // 댓글 목록
            newComment: '', // 새로운 댓글
            similarPosts: [] // 유사한 게시글 목록
        };
    },
    methods: {
        editPost() {
            // 게시물 수정 기능 구현
        },
        deletePost() {
            // 게시물 삭제 기능 구현
        },
        submitPost() {
            // 새로운 게시물 등록 기능 구현
        },
        addComment() {
            // 새로운 댓글 추가 기능 구현
        },
        loadSimilarPosts() {
            // 유사한 게시글 불러오기 기능 구현
        }
    },
    created() {
        // 게시물, 댓글, 유사한 게시글 데이터 초기화
        this.post = {
            title: '게시물 제목',
            content: '게시물 내용',
            author: '작성자',
            user_profile_picture_url: 'user_profile_picture_url'
        };
        this.comments = [
            { user_name: '댓글 작성자 1', content: '댓글 내용 1' },
            { user_name: '댓글 작성자 2', content: '진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글진짜진짜긴댓글' }
        ];
        this.similarPosts = [
            { title: '유사 게시글 제목 1', author: '작성자1' },
            { title: '유사 게시글 제목 2', author: '작성자2' },
            { title: '유사 게시글 제목 3', author: '작성자3' },
        ];
    }
};
</script>

<style scoped>
.text-h6 {
    font-size: 16px;
    /* 댓글 내용 크기 조정 */
}
</style>