import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import join from "url-join";
var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const addInterceptor = (HOST, PORT) => {
  axios.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
      
      //get ข้อมูลที่ save จากหน้าอื่น
      const jwtToken = await AsyncStorage.getItem('token');
      console.log('Token: ', jwtToken);

      if (jwtToken) {
        config.headers = { Authorization: `Bearer ${jwtToken}` };
      }
      config.url = join(`${HOST}:${PORT}`, config.url);
    }
    return config;
  });
};

export const HttpClient = (HOST, PORT) => {
  addInterceptor(HOST, PORT);
  return axios;
};