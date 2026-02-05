export interface VocabularyDataType {
    id: string;
    vocabularySourceWeb: string; // the vocabulary from which website
    vocabulary:string; // word or phrase
    translations:string; 
    examples:string;
    createTime:number; // Date.now
    update:number;
    reviewTime:number; // The first follow-up occurs after a one-day interval, subsequent follow-ups occur at two-day intervals,and the data is deleted on the 30th day.
}