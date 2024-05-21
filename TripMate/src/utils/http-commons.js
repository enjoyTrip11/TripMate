import axios from "axios";

function localAxios() { 
    const instance = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-Type":"application/json;charset=utf-8"
        }
    })
    return instance
}

export { localAxios}
