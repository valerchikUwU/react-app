// api.js
import axios from 'axios';


const instance = axios.create({
  // baseURL: 'http://localhost:3000/api/',
  baseURL: process.env.REACT_APP_BASE_URL_INSTANCE,
  headers: {
    'Content-Type': 'application/json',
 },
 withCredentials: true, // Добавляем свойство withCredentials
});

export default instance;
