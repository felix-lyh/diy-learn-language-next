import { apiFetch } from './index';
import type { VocabularyDataType } from '@/type/vocabulary'
type QueryVocabulary = Partial<VocabularyDataType>;
// export const addVocabulary = ({ original, translation }:{ original:string, translation:string }) => {
//     return new Promise(async (resolve,reject)=>{
//         try {
//             const result = await apiFetch('/api/vocabulary', {
//                 method: 'post',
//                 body: { original, translation },
//             });
//             resolve(result)
//         } catch (error) {
//             reject(error)
//         }
//     })
// };
export const updateVocabulary = (query:QueryVocabulary) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'put',
                body: query,
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};
export const getVocabularyList = ({ page=1, limit=100}:{ page?:number, limit?:number,sort?:Record<string, 1 | -1>;}) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'get',
                body: { page, limit }
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};

export const deleteOneVoca = (id:string)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'delete',
                body: { id }
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteManyVoca = (idList:string[])=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'delete',
                body: { idList }
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
