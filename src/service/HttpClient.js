import axios from "axios";
import join from "url-join";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST,PORT } from "./Global";

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        const jwtToken = await AsyncStorage.getItem("token");
        if (jwtToken != null) {
            config.headers = { 'x-access-token': jwtToken }
        }
        //config.url = join(`${HOST}`, config.url);
        config.url = join(`${HOST}:${PORT}`, config.url);
    }
    return config;
})

export const httpClient = axios;