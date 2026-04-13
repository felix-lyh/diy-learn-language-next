import { useState, useEffect } from 'react';
import { useVocabularyStore } from '@/store/vocabulary';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import BrowseCard from '@/app/vocabulary/[bookId]/components/browse-card';
import { deleteManyVoca } from '@/request/vocabulary';
import { useParams } from 'next/navigation'
import { $t } from '@/utils/index'
export default function browseMode() {
    const { vocabularyList, fetchVocabularyList } = useVocabularyStore()
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const selectAll = selectedRows.length === vocabularyList.length
    const [isEditSate,setEditSate] = useState(false)
    const params = useParams()
    let bookId = params.bookId as string
    useEffect(() => {
        fetchVocabularyList({bookId:bookId,refresh:false})
    }, [])
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(vocabularyList.map((row) => row.id))
        } else {
            setSelectedRows([])
        }
    }
    const onSelectChange = (checked: boolean, id: string) => {
        if (checked) {
            setSelectedRows((list) => {
                return [...list, id]
            })
        } else {
            setSelectedRows((list) => {
                return list.filter(x => x !== id);
            })
        }
    }
    const deleteManyCard = ()=>{
        if(!selectedRows.length) return
        deleteManyVoca(selectedRows).then(()=>{
            fetchVocabularyList({bookId:bookId,refresh:true})
        }).catch((err)=>{
            debugger
        })
    }
    return (
        <div>
            <div className='flex items-center justify-between w-[93%]'>
                {isEditSate && <label htmlFor="select-all-checkbox" className='flex items-center w-fit cursor-pointer'>
                    <span className='mr-[10px]'>{$t('select_all')}</span>
                    <Checkbox
                        id="select-all-checkbox"
                        name="select-all-checkbox"
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                    />
                </label>}
                <div className='ml-auto'>
                    {isEditSate && <Button disabled={!selectedRows.length} onClick={deleteManyCard} className='mr-[10px]'>
                        {  $t('delete_btn') }
                    </Button>}
                    {!!vocabularyList.length && <Button onClick={()=>setEditSate(!isEditSate)} >
                        { isEditSate ? $t('complete_btn'):$t('edit_btn') }
                    </Button>}
                </div>
            </div>
            <div className='flex flex-wrap'>
                { vocabularyList.length ? vocabularyList.map(vocabulary =>
                    <BrowseCard 
                    {...vocabulary} 
                    isEditSate={isEditSate} 
                    isChecked={selectedRows.includes(vocabulary.id)} 
                    onSelectChange={onSelectChange} 
                    key={vocabulary.id}
                    onUpdateVacoList={()=>fetchVocabularyList({bookId:bookId,refresh:true})}
                    > 
                    </BrowseCard>)
                    :
                    <div className='w-full mt-[30px] text-2xl text-center'>{ $t('vocabulary_empty') }</div>
                }
            </div>
        </div>
    );
};
