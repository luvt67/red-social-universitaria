import api from './api';
export async function getPosts() {
    return api.get('/grud');
}
export async function createPost(dataPost: FormData)
{
    return api.post('/publications/create', dataPost,{headers: { 'Content-Type': 'multipart/form-data' }});
}
export async function getAllPosts()
{
    return api.get('/publications/getposts');
}
