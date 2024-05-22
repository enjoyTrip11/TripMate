import { localAxios } from "@/utils/http-commons";

const local = localAxios()

async function loadAllHotPlace(success, fail) {
    local.get('hotplace/all')
        .then(success)
        .catch(fail)
}

async function loadMyHotPlace(userId, success, fail) {
    local.get(`hotplace/${userId}`)
        .then(success)
        .catch(fail)
}

async function updateHotPlace(locationId, userId, success, fail) {
    local.post('hotplace', {params : {locationId: locationId, userId:userId}})
        .then(success)
        .catch(fail)
}

async function deleteHotPlace(hotplaceId, success, fail) {
    local.delete('hotplace', {params : { hotplaceId : hotplaceId}})
    .then(success)
    .catch(fail)
}

export { loadMyHotPlace, loadAllHotPlace, updateHotPlace, deleteHotPlace }