import { apiFetch } from './index';
import type { VocabularyDataType } from '@/type/vocabulary'
type QueryVocabulary = Partial<VocabularyDataType>;

type AddVocaType = Pick<VocabularyDataType, "vocabulary" | "translations" | "examples" | "bookId">

export const addVocabulary = ({ vocabulary, translations = '', examples = '',bookId }: AddVocaType) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'post',
                body: { vocabulary, translations, examples,bookId },
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};

export const updateVocabulary = (query: QueryVocabulary) => {
    return new Promise(async (resolve, reject) => {
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
export const getVocabularyList = ({ bookId, page = 1, limit = 100, }: { bookId: string; page?: number, limit?: number, sort?: Record<string, 1 | -1>; }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await apiFetch('/api/vocabulary', {
                method: 'get',
                body: { bookId, page, limit }
            });
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
};

export const deleteOneVoca = (id: string) => {
    return new Promise(async (resolve, reject) => {
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

export const deleteManyVoca = (idList: string[]) => {
    return new Promise(async (resolve, reject) => {
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
