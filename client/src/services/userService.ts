import api from './api';

export async function login(email: string, password: string) {
  return api.post('/users/login', { email, password });
}

export async function register(username: string, email: string, password: string) {
  return api.post('/users', { username, email, password });
}

export async function getUsers() {
  return api.get('/grud');
}

export async function updateUser(userData: FormData) {
  return api.put('/users/update', userData,{headers:{'content-type':'multipart/form-data'}});
}
export async function deleteUser(id: string) {
  return api.delete(`/users/${id}`);
}
