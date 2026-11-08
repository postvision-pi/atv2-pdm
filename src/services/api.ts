import { create } from 'axios';

export const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://postvision-api.onrender.com/',
});
