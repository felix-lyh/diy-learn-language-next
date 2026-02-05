import { useState, useEffect, useRef,useMemo } from "react";
import { $t } from '@/utils/index'
import { useVocabularyStore } from '@/store/vocabulary';
import InitBlock from '@/components/init-block';
export default function TrainingMode() {
    const [isReady,setIsReady] = useState(false)
    const [currentVocabularyIndex, setCurrentVocaIndex] = useState(0);
    const [currentCharacter, setCurrentCharacter] = useState(0);
    const [isError, setIsError] = useState(false);
    const { vocabularyList, fetchVocabularyList } = useVocabularyStore()
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);
    const correctSoundRef = useRef<HTMLAudioElement | null>(null);
    const errorSoundRef = useRef<HTMLAudioElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentVocabulary = useMemo(
        () => vocabularyList[currentVocabularyIndex],
        [vocabularyList, currentVocabularyIndex]
    );
    const currentVocaRef = useRef(currentVocabulary);
    const currentCharacterRef = useRef(currentCharacter);

    const resetAgainBtn = ()=>{
        setCurrentVocaIndex(0)
        setCurrentCharacter(0)
    }
    useEffect(() => {
        clickSoundRef.current = new Audio('/sounds/click2.wav')
        correctSoundRef.current = new Audio('/sounds/correct.wav')
        errorSoundRef.current = new Audio('/sounds/click-error.wav')
        const handleInit = ()=>{
            setIsReady(true)
        }
        fetchVocabularyList({refresh:false}).then(()=>{
            setCurrentVocaIndex(0)
        })
        window.addEventListener('click',handleInit)
        window.addEventListener('keydown',handleInit)
        return ()=>{
            window.removeEventListener('click',handleInit);
            window.removeEventListener('keydown',handleInit);
        }
    }, [])
    useEffect(() => {
        currentVocaRef.current = currentVocabulary;
        currentCharacterRef.current = currentCharacter;
    }, [currentVocabulary, currentCharacter]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            const currentVocabulary = currentVocaRef.current;
            const charIndex = currentCharacterRef.current;
            const original = currentVocabulary?.vocabulary.toLowerCase();
            if (key === original[charIndex]) {
                if (clickSoundRef.current) {
                    clickSoundRef.current.currentTime = 0;
                    clickSoundRef.current.play().catch(() => { });
                }
                setCurrentCharacter((prev) =>prev + 1);
                if(charIndex+1 === original.length){
                    setCurrentVocaIndex((pre)=>pre + 1)
                    setCurrentCharacter(0);
                    if (correctSoundRef.current) {
                        correctSoundRef.current.currentTime = 0;
                        correctSoundRef.current.play().catch(() => { });
                    }
                }
            } else {
                if(errorSoundRef.current){
                    errorSoundRef.current.currentTime = 0;
                    errorSoundRef.current.play().catch(() => { });
                }
                setIsError(true);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    setIsError(false);
                    setCurrentCharacter(0);
                    timeoutRef.current = null;
                }, 300);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative flex items-center justify-center h-screen">
            { !isReady && <InitBlock/> }
            <div className="flex flex-col items-center text-3xl space-x-2">
                <div>
                    {currentVocabulary?.vocabulary.split("").map((letter, index) => (
                        <span
                            key={index}
                            className={`px-1 transition-colors duration-200 ${index < currentCharacter
                                ? "text-green-500"
                                : index === currentCharacter && isError
                                    ? "text-red-500 font-bold"
                                    : "text-gray-700"
                                }`}
                        >
                            {letter}
                        </span>
                    ))}
                </div>
                <div className="my-[10px]">{currentVocabulary?.translations}</div>
                { !currentVocabulary?.vocabulary &&
                    <div>
                        <span className="mr-[3px]">{$t('parctice_over')}</span>
                        <span onClick={resetAgainBtn} className="text-[#36bcf8] underline cursor-pointer">{ $t('once_again')}</span>
                    </div>
                }
            </div>
        </div>
    );
}
