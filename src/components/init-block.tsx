import { $t } from '@/utils/index'
export default function InitBlock() {
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-[#333]/10 z-10 rounded-lg backdrop-blur-md text-lg flex justify-center items-center'>{$t('init_page_banner.title')}</div>
    );
};