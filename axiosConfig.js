import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Настройка Axios Interceptors
axios.interceptors.request.use(async function (config) {
    const token = await SecureStore.getItemAsync('token');
    console.log('Добавляемый токен:', token);  // Это покажет токен в консоли перед каждым запросом
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axios;
