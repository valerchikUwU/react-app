// api.js
import axios from 'axios';

const apiURL = process.env.REACT_APP_ENV === 'dev'? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

const instance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
 },
 withCredentials: true, // Добавляем свойство withCredentials
});

export default instance;
