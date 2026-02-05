'use client'

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { $t } from '@/utils/index'
import OutputMode from "./output-mode";
import TrainingMode from "./training-mode";

export default function Page() {
    const [outputMode, setOutputMode] = useState(true);
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-[30px]">
                <div>
                    <h1>{ outputMode ? $t('wirte_practice.training'):$t('wirte_practice.output') }</h1>
                    <p>{outputMode ? $t('wirte_practice.training.desc'):$t('wirte_practice.output.desc') }</p>
                </div>
                <div className='flex items-center'>
                    <Label htmlFor="memory-mode">{$t('wirte_practice.output')}</Label>
                    <Switch className='mx-[10px]' id="memory-mode" checked={outputMode} onCheckedChange={setOutputMode} />
                    <Label htmlFor="browse-mode">{$t('wirte_practice.training')}</Label>
                </div>
            </div>
            {outputMode ? <TrainingMode/> : <OutputMode/>}
        </div>
    );
}
