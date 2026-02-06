"use client";
import { useState } from 'react'
import type { VocabularyDataType } from '@/type/vocabulary'
import PlayVoice from "@/components/play-voice";
import SvgIcon from "@/icons/svg-icon";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { $t } from '@/utils/index'
import { deleteOneVoca, updateVocabulary } from '@/request/vocabulary';
interface PropType extends VocabularyDataType {
    isEditSate: boolean;
    isChecked: boolean;
    onSelectChange: Function;
    onUpdateVacoList: Function
}
type QueryVocabulary = Partial<VocabularyDataType>;
export default function VocabularyCard(props: PropType) {
    const [modelValue,setModelValue] = useState<PropType>(props)
    const [isEditTrans, setEditTrans] = useState(false)
    const [isEditExample, setEditExample] = useState(false)
    const handleCheck = (checked: boolean, id: string) => {
        props.onSelectChange(checked, id)
    }
    const handleDeleteOneVoca = () => {
        deleteOneVoca(props.id).then(() => {
            props.onUpdateVacoList()
        })
    }
    const handleUpdate = (query: QueryVocabulary) => {
        updateVocabulary({...query,id:props.id}).then(res => {
            setEditTrans(false)
            setEditExample(false)
            setModelValue(Object.assign({},props,query))
        }).catch(() => {

        })
    }

    return (
        <div className="group w-[30%] min-w-[300px] bg-white mt-[10px] mr-[10px] rounded-md border border-gray-200 p-[10px] cursor-pointer overflow-hidden">
            <div className='flex justify-between items-center mb-[6px]'>
                {props.isEditSate && <Checkbox name={props.id} checked={props.isChecked} onCheckedChange={(event: boolean) => handleCheck(event, props.id)} />}
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
            <div className='min-h-[36px] flex items-center justify-between text-[13px] my-[5px]'>
                {
                    isEditTrans ?
                        <Input
                            defaultValue={modelValue.translations}
                            className='text-[13px] py-[5px] px-[6px]'
                            placeholder={$t('input_translations')}
                            onBlur={(e) => handleUpdate({translations:e.target.value})}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleUpdate({translations:(e.target as HTMLInputElement).value});
                                }
                            }}
                        /> :
                        <span>{modelValue.translations || $t('input_translations')}</span>
                }
                <span onClick={() => setEditTrans(!isEditTrans)} className='hidden group-hover:block ml-[10px]'>
                    <SvgIcon name='edit' width={30} height={30} />
                </span>
            </div>
            <div className='min-h-[36px] flex items-center justify-between text-[13px] my-[5px]'>
                {isEditExample ?
                    <Input 
                    defaultValue={modelValue.examples} 
                    placeholder={$t('input_examples')} 
                    className='text-[13px] py-[5px] px-[6px]'
                    onBlur={(e) => handleUpdate({examples:e.target.value})}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdate({examples:(e.target as HTMLInputElement).value});
                        }
                    }}
                    /> :
                    <span>{modelValue.examples || $t('input_examples')}</span>
                }
                <span onClick={() => setEditExample(!isEditExample)} className='hidden group-hover:block ml-[10px]'>
                    <SvgIcon name='edit' width={30} height={30} />
                </span>
            </div>
        </div>
    )
}
