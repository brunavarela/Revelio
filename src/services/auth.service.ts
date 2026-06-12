import * as SecureStore from 'expo-secure-store';
import api from './api';

export type House = 'Grifinoria' | 'Sonserina' | 'Lufa-Lufa' | 'Corvinal';

export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  house: House;
  avatar_url?: string;
}

export async function register(data: {
  name: string;
  nickname: string;
  email: string;
  password: string;
  house: House;
}): Promise<User> {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await api.post('/auth/login', { email, password });
  await SecureStore.setItemAsync('token', res.data.token);
  return res.data;
}

export async function logout() {
  await SecureStore.deleteItemAsync('token');
}

export async function getStoredToken() {
  return SecureStore.getItemAsync('token');
}
