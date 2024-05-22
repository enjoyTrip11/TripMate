import { localAxios } from "@/utils/http-commons";

const local = localAxios()

function loadReply(boardId, success, fail) {
    local.get('reply', {params : { boardId : boardId}})
        .then(success)
        .catch(fail)
}

function updateReply(replyId, reply, success, fail) {
    local.put(`reply/${replyId}`, JSON.stringify(reply))
        .then(success)
        .catch(fail)
}

function deleteReply(replyId, boardId, success, fail) {
    local.delete(`reply/${replyId}`, {params : {boardId : boardId}})
    .then(success)
    .catch(fail)
}

function createReply(reply, success, fail) {
    local.post('reply', JSON.stringify(reply))
    .then(success)
    .catch(fail)
}


export { loadReply, updateReply, deleteReply, createReply }