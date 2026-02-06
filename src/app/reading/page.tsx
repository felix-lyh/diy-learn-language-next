'use client';
// import SvgIcon from '@/icons/svg-icon';
import { $t } from '@/utils/index'
export default function Page() {
    return (
        <div>
            <div>
                <h1>{$t('wirte_practice.header')}</h1>
                <p>{$t('wirte_practice.header_desc')}</p>
            </div>
            <div className=''>
                <ul className='flex '>
                    <li>reading</li>
                </ul>
            </div>
            <div className="">
            </div>
        </div>
    );
}
