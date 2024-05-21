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
            <router-link :to="{name : 'boardModify', params: { boardId: post.boardId }}" >
                <v-btn @click="editPost" color="success" class="mr-2">수정</v-btn>
            </router-link>
                <v-btn @click="openDeleteDialog" color="error" class="mr-2">삭제</v-btn>
                <router-link :to="{name : 'board'}" >
                    <v-btn color="info">목록</v-btn>
                 </router-link>
            </v-col>
        </v-row>

        <!-- 삭제 확인 다이얼로그 -->
        <v-dialog v-model="deleteDialog" max-width="500">
            <v-card>
                <v-card-title class="headline">게시물을 삭제하시겠습니까?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDeleteDialog">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="confirmDelete">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { detailBoard, deleteBoard } from "@/api/board"
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const boardId = route.params.boardId

const post = ref({})
const deleteDialog = ref(false)

const comments = ref([])
const similarPosts = [
    { title: '유사 게시글 제목 1', author: '작성자1' },
    { title: '유사 게시글 제목 2', author: '작성자2' },
    { title: '유사 게시글 제목 3', author: '작성자3' },
]

function loadPost() {
    detailBoard(
        boardId,
        ({ data }) => {
            console.log("loadPost.........", data)
            post.value = data
        },
        (error) => {
            console.log(error)
        }
    )
}
loadPost()

function openDeleteDialog() {
    deleteDialog.value = true
}

function closeDeleteDialog() {
    deleteDialog.value = false
}

function confirmDelete() {
    deleteBoard(
        boardId,
        () => {
            console.log("deletePost.........")
            closeDeleteDialog()
            router.push({ name: 'board' })
        },
        (error) => {
            console.log(error)
        }
    )
}
</script>

<style scoped>
.text-h6 {
    font-size: 16px;
}
</style>
