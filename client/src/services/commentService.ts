import api from './api';
export async function createComment(dataComment: FormData)
{
    return api.post('/comments/create', dataComment,{headers: { 'Content-Type': 'multipart/form-data' }});
}
export async function getAllComments(id_publicacion: string)
{
    return await api.post('/comments/getcomments',{id_publicacion});
}
