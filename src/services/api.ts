import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://postvision-api.onrender.com/',
});