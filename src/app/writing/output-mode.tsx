import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { addArticles } from '@/request/article';
import { $t } from '@/utils/index'
import clientSystem from "@/client-system";
import { Button } from "@/components/ui/button"
export default function OutputMode() {
    const [textValue, setTextValue] = useState('');
    const textRef = useRef(textValue);
    const saveArticleBtn = () => {
        if(!textRef.current){
            return
        }
        addArticles({ text: textRef.current })
            .then(() => {
            }).catch(() => {

            })
    }
    const textAreaChange = (value:string)=>{
        setTextValue(value);
        textRef.current = value;
    }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // MacOS: metaKey (Command)，Windows/Linux: ctrlKey
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                saveArticleBtn()
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    return (
        <div>
            <Textarea className="mt-[15px]" value={textValue} rows={6} onChange={(e) => {textAreaChange(e.target.value)}} placeholder={$t('common.placeholder')} />
            <Button disabled={!textValue} variant="outline" onClick={saveArticleBtn} className="flex w-fit ml-auto mt-[15px] py-[5px] px-[7px] text-[18px] text-blue-500 border border-solid rounded-lg cursor-pointer">
                <span  className="mr-[5px]">{$t('common.save')}</span>
                <span>{ clientSystem.modifierKeyPrefix } + s  </span>
            </Button>
        </div>
    );
};