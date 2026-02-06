"use client";
export function getVoicesAsync() {
    return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) return resolve(voices);

        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            resolve(voices);
        };
    });
}
export async function speakWithVoice(text: string, onStart?: () => void, onEnd?: () => void,voiceName = 'Samantha') {
    const voices: any = await getVoicesAsync();
    const selected = voices?.find((v: any) => v.name === voiceName);
    const utter = new SpeechSynthesisUtterance(text);
    if (selected) utter.voice = selected;
    utter.lang = selected?.lang || 'en-US';
    utter.rate = 1
    utter.onstart = () => {
        console.log('TTS 開始播放');
        onStart?.();
    };
    utter.onend = () => {
        onEnd?.()
    };
    utter.onerror = (err) => {
        console.error(err)
        onEnd?.()
    }; // 出錯時也結束
    if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
    }
    speechSynthesis.speak(utter);
}
export function stopVoice() {
    speechSynthesis.cancel();
}