import { localAxios } from "@/utils/http-commons";


const local = localAxios()
const accessToken = localStorage.getItem('accessToken');

function loadReply(boardId, success, fail) {
    local.get('reply', {params : { boardId : boardId}}, {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }})
        .then(success)
        .catch(fail)
}

function updateReply(replyId, boardId, updatedReply, success, fail) {
    local.put(`reply/${replyId}?boardId=${boardId}`, JSON.stringify(updatedReply), {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }})
        .then(success)
        .catch(fail)
}

function deleteReply(replyId, boardId, success, fail) {
    local.delete(`reply/${replyId}`, {params : {boardId : boardId}}, {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }})
    .then(success)
    .catch(fail)
}

function createReply(reply, success, fail) {
    local.post('reply', JSON.stringify(reply), {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }})
    .then(success)
    .catch(fail)
}


export { loadReply, updateReply, deleteReply, createReply }