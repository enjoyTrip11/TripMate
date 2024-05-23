import { localAxios } from "@/utils/http-commons";

const local = localAxios()
// const accessToken = localStorage.getItem('accessToken');
// , {
//     headers: {
//         Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
//     }}

function loadBoard(params, success, fail) {
    local.get('board', params)
        .then(success)
        .catch(fail)
}

function detailBoard(boardId, success, fail) {
    local.get(`board/${boardId}`)
        .then(success)
        .catch(fail)
}

function updateBoard(boardId, board, success, fail) {
    local.put(`board/${boardId}`, JSON.stringify(board))
        .then(success)
        .catch(fail)
}

function deleteBoard(boardId, success, fail) {
    local.delete(`board/${boardId}`)
    .then(success)
    .catch(fail)
}

function createBoard(board, success, fail) {
    local.post('board', JSON.stringify(board))
    .then(success)
    .catch(fail)
}


export { loadBoard, detailBoard, updateBoard, deleteBoard, createBoard }