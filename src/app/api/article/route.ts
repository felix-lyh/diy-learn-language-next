import db from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = Object.fromEntries(searchParams.entries());
    } catch (error) {

    }
    // const searchParams = req.nextUrl.searchParams;
    // const query = Object.fromEntries(searchParams.entries());
    // try {
    //     const articles = await paginate(db.articles, {}, query)
    //     const response = NextResponse.json(articles);
    //     return response;
    // } catch (error) {
    //     console.log('error', error)
    //     return NextResponse.json({ error }, { status: 500 });
    // }
}

export async function POST(req: NextRequest) {
    try {
        const query = await req.json(); // 解析 JSON 資料
        const { id, text } = query;
        if(!!id){
            let data = await db.articles.updateOne({ id }, { text })
            return NextResponse.json({ message: 'articles updated successfully',data }, { status: 200 });
        }
        let data = await db.articles.insertOne({ text })
        return NextResponse.json({ message: 'articles saved successfully',data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error,message:'Invalid request' }, { status: 400 });
    }
}

// export async function PUT(req: NextRequest) {
//     try {
//         const query = await req.json(); // 解析 JSON 資料


//     } catch (error) {
//         return NextResponse.json({ error,message:'Invalid request' }, { status: 400 });
//     }
// }