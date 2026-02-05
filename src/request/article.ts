import { apiFetch } from './index';

export const addArticles = ({ text }:{ text:string }) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/article', {
                method: 'post',
                body: { text },
            });
            resolve(result)
            console.log('成功新增:', result);
        } catch (error) {
            reject(error)
            console.error('新增失敗:', error);
        }
    })
};
export const updateArticles = ({id, text }:{ id:string,text:string }) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/articles', {
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
// export const getWords = ({ page=1, limit=100}:{ page?:number, limit?:number,sort?:string }) => {
//     return new Promise(async (resolve,reject)=>{
//         try {
//             const result = await apiFetch('/api/words', {
//                 method: 'get',
//                 body: { page, limit }
//             });
//             resolve(result)
//             console.log('成功新增:', result);
//         } catch (error) {
//             reject(error)
//             console.error('新增失敗:', error);
//         }
//     })
// };
