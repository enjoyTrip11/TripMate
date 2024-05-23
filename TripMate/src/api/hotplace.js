import { localAxios } from "@/utils/http-commons";

const local = localAxios()

async function loadAllHotPlace(userId, success, fail) {
    local.get(`hotplace/all?userId=${userId}`)
        .then(success)
        .catch(fail)
}

async function loadMyHotPlace(userId, success, fail) {
    local.get(`hotplace/${userId}`)
        .then(success)
        .catch(fail)
}

async function updateHotPlace(locationId, userId, success, fail) {
        local.post(`hotplace?locationId=${locationId}&userId=${userId}`)
        .then(success)
        .catch(fail)
}

async function deleteHotPlace(locationId, userId, success, fail) {
    local.delete('hotplace', {params : { locationId : locationId, userId: userId}})
    .then(success)
    .catch(fail)
}

export { loadMyHotPlace, loadAllHotPlace, updateHotPlace, deleteHotPlace }