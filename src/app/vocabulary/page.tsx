"use client";
import { useEffect, useState } from 'react';
import { $t } from '@/utils/index';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import SvgIcon from '@/icons/svg-icon';
import type { VocabularyBookType } from '@/type/vocabularyBook'
import { addBook, getBooks } from '@/request/book'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogClose,
    DialogTitle
} from "@/components/ui/dialog"

export default function Page() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [bookList, setBookList] = useState<VocabularyBookType[]>([])
    const [bookName,setBookName] = useState('')
    const handleSubmit = (event: any) => {
        if(!bookName) return
        event.preventDefault();
        addBook({ bookName }).then(() => {
            setOpen(false)
            getBookList()
        })
    }
    const getBookList = () => {
        getBooks({ limit: 0, page }).then((res: any) => {
            let list = res?.data || []
            setBookList(list)
        }).catch(err => {

        })
    }
    useEffect(() => {
        getBookList()
    }, [])
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <h1>{$t('vocabulary.page.header')}</h1>
                    <p>{$t('vocabulary.page.header_desc')}</p>
                </div>
                <Dialog open={open} onOpenChange={(value)=>setOpen(value)}>
                    <DialogTrigger>
                        <div onClick={()=>setOpen(true)} className='flex items-center bg-primary rounded-md text-[#fff] py-[8px] px-[10px]'>
                            <SvgIcon width={16} height={16} name='addFile' color='#fff'></SvgIcon>
                            <span className='ml-[10px]'>{$t('add_vocabulary_book')}</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <form onSubmit={handleSubmit}>
                            <div className='flex items-center mt-[20px]'>
                                <label>{$t('add_book.name')}</label>
                                <Input value={bookName} onChange={(e: any) =>
                                    setBookName(e.target.value)
                                } className='flex-1 ml-[15px]' placeholder={$t('add_book.name')}></Input>
                            </div>
                            <div className='flex justify-end mt-[20px]'>
                                <DialogClose asChild>
                                    <Button onClick={()=>setOpen(false)} type="button">{$t('common.close')}</Button>
                                </DialogClose>
                                <Button className='ml-[20px]' disabled={!bookName} type='submit'>{$t('common.save')}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='mt-[15px] h-full'>
                {
                    bookList.length ?
                        <ul className='flex flex-wrap'>
                            {bookList.map(book =>
                                <div key={book.bookId} className="flex gap-8 cursor-pointer">
                                    <Link href={`/vocabulary/${book.bookId}`} className="block">
                                        <div className="group relative h-60 w-52 [perspective:1000px] text-[#fff] text-2xl" >
                                            <div className="absolute inset-0 h-full w-48 rounded-lg bg-primary shadow-md"></div>
                                            <div className="relative z-50 h-full w-48 origin-left transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-30deg)]">
                                                <div className="rounded-lg bg-white shadow-md absolute flex w-full h-full [backface-visibility:hidden]">
                                                    <div className="relative flex h-full w-full flex-col items-start justify-between rounded-lg p-4" >
                                                        <div className="absolute inset-0 w-full rounded-lg bg-[#a8a8a8] py-[10px] px-[15px]">{book.bookName}</div>
                                                        <div className="relative z-10 flex w-full flex-1 flex-col">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="z-1 absolute bottom-0 right-0 flex h-48 w-14 -translate-x-10 transform items-start justify-start rounded-r-lg bg-green-600 pl-2 pt-2 text-xs font-bold text-white transition-transform duration-300 ease-in-out [backface-visibility:hidden] group-hover:translate-x-0 group-hover:rotate-[5deg]"><div className="-rotate-90 whitespace-nowrap pb-16 pr-9">CLICK TO READ</div>
                                        </div> */}
                                        </div>
                                    </Link>
                                </div>)}
                        </ul>
                        :
                        <div className='text-[20px] text-center mt-[25px]'>
                            {$t('vocabulary_book_empty')}
                        </div>
                }
            </div>
        </div>
    )
}
