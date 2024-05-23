import { localAxios } from "@/utils/http-commons";

const local = localAxios()
const accessToken = localStorage.getItem('accessToken');


async function loadAllHotPlace(userId, success, fail) {
    local.get(`hotplace/all?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }
    })
        .then(success)
        .catch(fail)
}

async function loadMyHotPlace(userId, success, fail) {
    local.get(`hotplace/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }
    })
        .then(success)
        .catch(fail)
}

async function updateHotPlace(locationId, userId, success, fail) {
        local.post(`hotplace?locationId=${locationId}&userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
            }
        })
        .then(success)
        .catch(fail)
}

async function deleteHotPlace(locationId, userId, success, fail) {
    local.delete('hotplace', {params : { locationId : locationId, userId: userId}}, {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }
    })
    .then(success)
    .catch(fail)
}

export { loadMyHotPlace, loadAllHotPlace, updateHotPlace, deleteHotPlace }