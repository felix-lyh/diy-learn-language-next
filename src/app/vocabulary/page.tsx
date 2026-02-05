"use client";
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import MemoryMode from './memory-mode';
import BrowseMode from './browse-mode'
import { $t } from '@/utils/index'

export default function Page() {
    const [isBrowseMode, setIsBrowseMode] = useState(false)
    const handleMode = (event:boolean)=>{
        localStorage.setItem('isBrowseMode',JSON.stringify(event))
        setIsBrowseMode(event)
    }
    useEffect(()=>{
        let local = JSON.parse(localStorage.getItem('isBrowseMode')||'null') || false
        setIsBrowseMode(local)
    })
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <h1>{$t('vocabulary.page.header')}</h1>
                    <p>{$t('vocabulary.page.header_desc')}</p>
                </div>
                <div className='flex items-center'>
                    <Label htmlFor="memory-mode">{$t('vocabulary.page.header.mode_type.memory')}</Label>
                    <Switch className='mx-[10px]' id="memory-mode" checked={isBrowseMode} onCheckedChange={(event)=>handleMode(event)} />
                    <Label htmlFor="browse-mode">{$t('vocabulary.page.header.mode_type.browse')}</Label>
                </div>
            </div>
            <div className='relative mt-[15px] h-full'>
                { isBrowseMode ? <BrowseMode/> :<MemoryMode/> }
            </div>
        </div>
    )
}
