"use client";
import { useEffect, useState,useRef } from 'react';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MemoryMode from './memory-mode';
import BrowseMode from './browse-mode'
import { $t } from '@/utils/index';
import { addVocabulary } from '@/request/vocabulary'
import { useParams } from 'next/navigation';
import { useVocabularyStore } from '@/store/vocabulary';
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
    const params = useParams()
    const bookId = params.bookId as string
    const [isBrowseMode, setIsBrowseMode] = useState(true)
    const [vocaData, setVocaData] = useState({
        vocabulary: '',
        translations: '',
        examples: ''
    })
    const { fetchVocabularyList } = useVocabularyStore()
    const handleMode = (event: boolean) => {
        localStorage.setItem('isBrowseMode', JSON.stringify(event))
        setIsBrowseMode(event)
    }
    const [isAddVoca,setIsAddVoca] = useState(false)
    const firstInputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: any) => {
        if(!vocaData.vocabulary) return
        event.preventDefault();
        setVocaData({
            vocabulary: '',
            translations: '',
            examples: ''
        })
        let query = {...vocaData,bookId}
        addVocabulary(query).then(()=>{
            setIsAddVoca(true)
            firstInputRef.current?.focus()
        })
    };
    const handleOpenChange = (value:boolean)=>{
        if(!value && isAddVoca){
            setIsAddVoca(false)
            fetchVocabularyList({bookId,refresh:true})
        }
    }
    useEffect(() => {
        fetchVocabularyList({bookId,refresh:true})
    }, [])
    useEffect(() => {
        let local = JSON.parse(localStorage.getItem('isBrowseMode') || 'null') || false
        setIsBrowseMode(local)
    }, [])
    return (
        <div>
            <div className='flex justify-between items-center'>
                <Link href='/vocabulary'>返回</Link>
                <div className='flex items-center mr-[20px]'>
                    <Label htmlFor="memory-mode">{$t('vocabulary.page.header.mode_type.memory')}</Label>
                    <Switch className='mx-[10px]' id="memory-mode" checked={isBrowseMode} onCheckedChange={(event) => handleMode(event)} />
                    <Label htmlFor="browse-mode">{$t('vocabulary.page.header.mode_type.browse')}</Label>
                </div>
                <Dialog onOpenChange={handleOpenChange}>
                    <DialogTrigger>
                        <span className='bg-primary rounded-md text-[#fff] py-[8px] px-[10px]'>{$t('add_vocabulary')}</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <form onSubmit={handleSubmit}>
                            <div className='flex items-center mt-[20px]'>
                                <label>{$t('collect_words.vocabulary')}</label>
                                <Input ref={firstInputRef} value={vocaData.vocabulary} onChange={(e: any) =>
                                    setVocaData((prev) => ({
                                        ...prev,
                                        vocabulary: e.target.value,
                                    }))
                                } className='flex-1 ml-[15px]' placeholder={$t('collect_words.vocabulary')}></Input>
                            </div>
                            <div className='flex items-center mt-[20px]'>
                                <label>{$t('collect_words.translation')}</label>
                                <Input onChange={(e: any) =>
                                    setVocaData((prev) => ({
                                        ...prev,
                                        translations: e.target.value,
                                    }))
                                } value={vocaData.translations} className='flex-1 ml-[15px]' placeholder={$t('collect_words.translation_ph')}></Input>
                            </div>
                            <div className='flex items-center mt-[20px]'>
                                <label>{$t('collect_words.examples')}</label>
                                <Input onChange={(e: any) =>
                                    setVocaData((prev) => ({
                                        ...prev,
                                        examples: e.target.value,
                                    }))
                                } value={vocaData.examples} className='flex-1 ml-[15px]' placeholder={$t('collect_words.examples_ph')}></Input>
                            </div>
                            <div className='flex justify-end mt-[20px]'>
                                <DialogClose asChild>
                                    <Button type="button">{$t('common.close')}</Button>
                                </DialogClose>
                                <Button className='ml-[20px]' disabled={!vocaData.vocabulary} type='submit'>{$t('common.save')}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='relative mt-[15px] h-full'>
                {isBrowseMode ? <BrowseMode /> : <MemoryMode />}
            </div>
        </div>
    )
}
