import { apiFetch } from './index';

export const getBooks = ({limit=0,page=1}:{limit:number,page:number}) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/book', {
                method: 'get',
                body: {limit,page},
            });
            resolve(result)
            console.log('add success:', result);
        } catch (error) {
            reject(error)
            console.error('add fail:', error);
        }
    })
};

export const addBook = ({ bookName }:{ bookName:string }) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/book', {
                method: 'post',
                body: { bookName },
            });
            resolve(result)
            console.log('add success:', result);
        } catch (error) {
            reject(error)
            console.error('add fail:', error);
        }
    })
};
export const updateBook = ({id, text }:{ id:string,text:string }) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/book', {
                method: 'post',
                body: { id,text },
            });
            resolve(result)
            console.log('update success:', result);
        } catch (error) {
            reject(error)
            console.error('update failed:', error);
        }
    })
};
