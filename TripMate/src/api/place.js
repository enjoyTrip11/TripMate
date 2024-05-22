import { localAxios } from "@/utils/http-commons";

const local = localAxios()

async function loadPlaces(searchFilter, success, fail) {
    console.log("SearchFilter.....", JSON.stringify(searchFilter));
    local.get('place', {
        params: searchFilter
    })
    .then(success)
    .catch(fail);
}

export { loadPlaces }