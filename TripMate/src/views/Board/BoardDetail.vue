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
                    <!-- 작성자 정보 및 게시물 내용 -->
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
                            <v-list-item v-for="(reply, index) in replies" :key="index">
                                <v-row :style="{ 'margin-left': reply.replyUserId ? '30px' : '0' }" align="center">
                                    <!-- 대댓글 표시 -->
                                    <v-col cols="1" v-if="reply.replyUserId">
                                        <v-icon>mdi-subdirectory-arrow-right</v-icon>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-list-item-avatar>
                                            <v-avatar size="30">
                                                <img src="@/assets/img/noProfile.png" alt="User Profile Picture"
                                                    style="width: 100%">
                                            </v-avatar>
                                        </v-list-item-avatar>
                                    </v-col>

                                    <!-- 유저 아이디 -->
                                    <v-col cols="auto" class="mr-2">
                                        <h4>{{ reply.userId }}</h4>
                                    </v-col>

                                    <!-- 여백 -->
                                    <v-spacer></v-spacer>

                                    <!-- 대댓글/수정/삭제 버튼 -->
                                    <v-col cols="auto">
                                        <v-btn v-if="!reply.replyUserId" x-small icon @click="startReply(reply)">
                                            <v-icon>mdi-reply</v-icon>
                                        </v-btn>
                                        <v-btn x-small icon @click="startEdit(reply)">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn x-small icon @click="openCommentDeleteDialog(reply.replyId)">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <!-- 댓글 내용 -->
                                <v-col cols="12" class="mb-2"
                                    :style="{ 'margin-left': reply.replyUserId ? '70px' : '0' }">
                                    <div v-if="editingComment && editingComment.replyId === reply.replyId">
                                        <v-text-field v-model="editComment" label="댓글 수정" outlined></v-text-field>
                                        <v-btn @click="updateComment(reply.replyId)" color="primary">수정</v-btn>
                                        <v-btn @click="cancelEdit" color="secondary">취소</v-btn>
                                    </div>
                                    <div v-else>
                                        <h3 style="font-weight: 200;">{{ reply.comment }}</h3>
                                    </div>
                                    <!-- 대댓글 입력 폼 -->
                                    <v-row align="center" class="mt-1"
                                        v-if="replyingTo && replyingTo.replyId === reply.replyId">
                                        <v-col cols="10">
                                            <v-text-field v-model="replyComment" label="대댓글 작성" outlined></v-text-field>
                                        </v-col>
                                        <v-col cols="2" class="d-flex align-center">
                                            <v-btn @click="submitReply" color="primary">작성</v-btn>
                                            <v-btn @click="cancelReply" color="secondary">취소</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <v-divider />
                            </v-list-item>
                        </v-list>

                        <!-- 댓글 입력 폼 -->
                        <v-row align="center">
                            <v-col cols="10">
                                <v-text-field v-model="newComment" label="댓글" outlined></v-text-field>
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

        <!-- 게시물 수정 삭제 버튼 -->
        <v-row justify="center">
            <v-col cols="12" class="d-flex justify-end">
                <router-link :to="{ name: 'boardModify', params: { boardId: post.boardId } }">
                    <v-btn @click="editPost" color="success" class="mr-2">수정</v-btn>
                </router-link>
                <v-btn @click="openDeleteDialog" color="error" class="mr-2">삭제</v-btn>
                <router-link :to="{ name: 'board' }">
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

        <!-- 댓글 삭제 확인 다이얼로그 -->
        <v-dialog v-model="commentDeleteDialog" max-width="500">
            <v-card>
                <v-card-title class="headline">댓글을 삭제하시겠습니까?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeCommentDeleteDialog">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="confirmDeleteComment">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { detailBoard, deleteBoard } from '@/api/board';
import { loadReply, createReply, updateReply, deleteReply } from '@/api/reply';

const route = useRoute();
const router = useRouter();
const boardId = route.params.boardId;

const post = ref({});
const deleteDialog = ref(false);
const commentDeleteDialog = ref(false);
const deleteCommentId = ref(null);

const replies = ref([]);
const newComment = ref('');
const replyComment = ref('');
const replyingTo = ref(null);
const editingComment = ref(null);
const editComment = ref('');

const curUserId = 1; // TODO : 접속자 ID로 바꿔주어야 함
const similarPosts = [
    { title: '유사 게시글 제목 1', author: '작성자1' },
    { title: '유사 게시글 제목 2', author: '작성자2' },
    { title: '유사 게시글 제목 3', author: '작성자3' },
];

// 게시물 불러오기
function loadPost() {
    detailBoard(
        boardId,
        ({ data }) => {
            console.log("loadPost.........", data);
            post.value = data;
            getReply();
        },
        (error) => {
            console.log(error);
        }
    );
}
loadPost();

// 댓글 불러오기
function getReply() {
    loadReply(
        boardId,
        ({ data }) => {
            console.log("loadReply......", data);
            replies.value = data;
        },
        (error) => {
            console.log(error);
        }
    );
}

// 새 댓글 추가
function addComment() {
    if (!newComment.value) return;
    createReply(
        { boardId, comment: newComment.value, userId: curUserId, replyUserId: 0 },
        ({ data }) => {
            console.log("createReply......", data);
            newComment.value = '';
            getReply();
        },
        (error) => {
            console.log(error);
        }
    );
}

// 대댓글 
function startReply(reply) {
    if (replyingTo.value && replyingTo.value.replyId === reply.replyId) {
        cancelReply();
    } else {
        replyingTo.value = reply;
        replyComment.value = '';
    }
}

function submitReply() {
    if (!replyComment.value || !replyingTo.value) return;
    createReply(
        { boardId, comment: replyComment.value, userId: post.value.userId, replyUserId: replyingTo.value.replyId },
        ({ data }) => {
            console.log("createReply......", data);
            replyComment.value = '';
            replyingTo.value = null;
            getReply();
        },
        (error) => {
            console.log(error);
        }
    );
}

function cancelReply() {
    replyingTo.value = null;
    replyComment.value = '';
}

function startEdit(reply) {
    editingComment.value = reply;
    editComment.value = reply.comment;
}

function isEditing(reply) {
    return editingComment.value && editingComment.value.replyId === reply.replyId;
}

// 댓글 수정
function updateComment() {

    console.log("Update........boardId:" , boardId, ", replyId:", editingComment.value.replyId, ", comment:", editComment.value)
    if (!editComment.value || !editingComment.value) return;
    updateReply(
        editingComment.value.replyId, boardId, {comment : editComment.value},
        ({ data }) => {
            console.log("updateReply......", data);
            editComment.value = '';
            editingComment.value = null;
            getReply();
        },
        (error) => {
            console.log(error);
        }
    );
}

function cancelEdit() {
    editingComment.value = null;
    editComment.value = '';
}

// 댓글 삭제 관련 
function openCommentDeleteDialog(replyId) {
    console.log("deleteComment........", replyId);
    deleteCommentId.value = replyId;
    commentDeleteDialog.value = true;
}

function closeCommentDeleteDialog() {
    commentDeleteDialog.value = false;
    deleteCommentId.value = null;
}

function confirmDeleteComment() {
    if (!deleteCommentId.value) return;

    console.log("Deleting reply with ID:", deleteCommentId.value, "from board:", boardId);

    deleteReply(
        deleteCommentId.value,
        boardId,
        () => {
            console.log("deleteReply success");
            closeCommentDeleteDialog();
            getReply();
        },
        (error) => {
            console.log("deleteReply error:", error);
        }
    );
}


// 게시물 삭제 관련
function openDeleteDialog() {
    deleteDialog.value = true;
}

function closeDeleteDialog() {
    deleteDialog.value = false;
}

function confirmDelete() {
    deleteBoard(
        boardId,
        () => {
            console.log("deletePost.........");
            closeDeleteDialog();
            router.push({ name: 'board' });
        },
        (error) => {
            console.log(error);
        }
    );
}
</script>

<style scoped>
.text-h6 {
    font-size: 16px;
}

.v-btn {
    box-shadow: none;
    border: none;
}

.v-btn .v-icon {
    font-size: 18px;
}
</style>