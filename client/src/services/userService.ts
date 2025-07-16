import api from './api';

export async function login(email: string, password: string) {
  return api.post('/users/login', { email, password });
}

export async function register(username: string, email: string, password: string) {
  return api.post('/users/register', { username, email, password });
}

export async function getUsers() {
  return await api.get('/users/getusers');
}
export async function getuser(id: string) {
  return api.post('/users/getuser',{id})
}

export async function consulta() {
  return await api.get('/users/maspublicaciones');
}

export async function updateUser(userData: FormData) {
  return api.put('/users/update', userData,{headers:{'content-type':'multipart/form-data'}});
}

export async function createUser(userData: FormData) {
  return api.post('/users/create', userData,{headers:{'content-type':'multipart/form-data'}});
}

export async function deleteUser(id: string) {
  return api.delete(`/users/delete/${id}`);
}
