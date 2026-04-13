import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server';
import { paginate } from '@/lib/dbhandle';
import type { VocabularyBookType } from '@/type/vocabularyBook'
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    // console.log('searchParams',searchParams)
    const { page,limit } = Object.fromEntries(searchParams.entries());
    const options = { page,limit }
    const query = {  }
    try {
        const vocabulary = await paginate(db.books,options,query)
        const response = NextResponse.json(vocabulary);
        return response;
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({ error }, { status: 500 });
    }
}

// add a book
export async function POST(req: NextRequest) {
    try {
        const query = await req.json(); 
        const { bookName } = query as VocabularyBookType;
        const createTime = Date.now();
        const insertData:VocabularyBookType = {
            bookName, // the book name
            bookId:(new ObjectId).toString(),
            createTime:createTime, // Date.now
            update:createTime
        }
        await db.books.insertOne(insertData)
        return NextResponse.json({ data:insertData, message: 'vocabulary saved successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
// update a word
export async function PUT(req: NextRequest) {
    try {
        const query:VocabularyBookType = await req.json(); // 解析 JSON 資料
        const { bookId } = query;
        if(!!bookId){
            await db.books.updateOne({bookId},{$set: query})
        }else{
            return NextResponse.json({ error: 'Invalid request there is no id' }, { status: 400 });
        }
        return NextResponse.json({ message: 'vocabulary updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
// delete book
export async function DELETE(req: NextRequest) {
    try {
        const query:{id?:string;idList?:string[]} = await req.json(); // 解析 JSON 資料
        const { id,idList} = query;
        if(!!id){
            await db.books.deleteOne({id})
        }
        if(!!idList){
            await db.books.deleteMany({ id: { $in: idList }});
        }
        return NextResponse.json({ message: 'vocabulary delete successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}