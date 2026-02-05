import { MongoClient }from 'mongodb';
import type { Collection } from 'mongodb';
const uri = process.env.MANGO_DB_URI!
const collectionList = ['users','comments','articles','vocabulary'] as const
const client = new MongoClient(uri);
let clientPromise = await client.connect();
const db = clientPromise.db('diy_learn_language');  //資料庫，根據你的需求更改

type CollectionName = typeof collectionList[number];
const dbPool:Record<CollectionName, Collection> = {} as Record<CollectionName, Collection>;

for (let index = 0; index < collectionList.length; index++) {
    let collectionName:CollectionName = collectionList[index];
    const collection = db.collection(collectionName)
    dbPool[collectionName] = collection
}

export default dbPool
