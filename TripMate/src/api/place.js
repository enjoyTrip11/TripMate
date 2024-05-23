import { localAxios } from "@/utils/http-commons";

const local = localAxios();
const accessToken = localStorage.getItem('accessToken');

async function loadPlaces(searchFilter, success, fail) {
    console.log("SearchFilter.....", JSON.stringify(searchFilter), {
        headers: {
            Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
        }
    });
    local.get('place', {
        params: searchFilter
    })
    .then(success)
    .catch(fail);
}

export { loadPlaces }