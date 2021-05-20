import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { base_url, places_url, token_url } from "../constants/api";

const url = base_url;

export default function useAxios() {
    const [auth] = useContext(AuthContext);

    const apiClient = axios.create({
        baseURL: url,
    });

    apiClient.interceptors.request.use(function (config) {
        const token = auth;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return apiClient;
}
