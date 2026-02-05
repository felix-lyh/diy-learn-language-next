"use client";
import { useState } from 'react'
import type { VocabularyDataType } from '@/type/vocabulary'
import PlayVoice from "@/components/play-voice";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { $t } from '@/utils/index'
import { deleteOneVoca } from '@/request/vocabulary';
interface PropType extends VocabularyDataType{
    isEditSate:boolean;
    isChecked:boolean;
    onSelectChange: Function;
    onUpdateVacoList:Function
}
export default function VocabularyCard(modelValue: PropType) {
    const handleCheck = (checked:boolean,id:string)=>{
        modelValue.onSelectChange(checked,id)
    }
    const handleDeleteOneVoca = ()=>{
        deleteOneVoca(modelValue.id).then(()=>{
            modelValue.onUpdateVacoList()
        })
    }
    return (
        <div className="group w-[30%] min-w-[300px] bg-white mt-[10px] mr-[10px] rounded-md border border-gray-200 p-[10px] cursor-pointer overflow-hidden">
            <div className='flex justify-between items-center mb-[6px]'>
                {modelValue.isEditSate && <Checkbox name={modelValue.id} checked={modelValue.isChecked} onCheckedChange={(event:boolean)=>handleCheck(event,modelValue.id)}/>  }
                <Popover>
                    <PopoverTrigger asChild>
                        <span className='inline-block ml-auto leading-[10px] w-[30px] h-[30px] text-center text-[36px] hover:bg-theme hover:text-[#fff] rounded-[6px]'>...</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit py-[6px] px-[10px]">
                        <ul>
                            <li className='cursor-pointer' onClick={handleDeleteOneVoca}>{$t('delete_btn')}</li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex items-center justify-between'>
                <span>{modelValue.vocabulary}</span>
                <PlayVoice voiceValue={modelValue.vocabulary} /> 
            </div>
            <div className='min-h-[36px]'>
                {modelValue.translations}
            </div>
            <div className='min-h-[36px]'>
                {modelValue.examples}
            </div>
        </div>
    )
}
