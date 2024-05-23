import { localAxios } from "@/utils/http-commons";

const local = localAxios()

function createPlan(planId, success, fail) {
    local.get(`plan/create?planId=${planId}`)
        .then(success)
        .catch(fail)
}


export { createPlan }