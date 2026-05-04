import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5064/api",
    withCredentials: true
});

export default API;