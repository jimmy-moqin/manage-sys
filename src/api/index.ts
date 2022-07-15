import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const request = axios.create({
    baseURL: "http://localhost/api",
})

export default request;