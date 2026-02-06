"use client";
import SvgIcon from "@/icons/svg-icon";
import "./globals.css";
import '@/i18n'
import { usePathname,useRouter } from 'next/navigation'
import { $t } from '@/utils/index'
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const routerList = ['vocabulary','listening','speaking','reading','writing'] as const;
    type RouterType = (typeof routerList)[number];
    const router = useRouter();
    const pathname = usePathname()
    const toPage = (pageName:RouterType)=>{
        if(pathname !== `/${pageName}`){
            router.push(`/${pageName}`,{ scroll: false });
        }
    }
    const currentPath = ()=>{
        return pathname.slice(1) as RouterType
    }

    return (
        <html lang="en">
            <body>
                <div className="flex bg-[#F5F5F5] h-[100%]">
                    { routerList.includes(currentPath())? <ul className="px-[15px] py-[10px]">
                        {
                            routerList.map((item:RouterType)=>{
                                return (
                                    <li onClick={()=>toPage(item)} 
                                    className={`${currentPath() === item ? 'text-theme':'text-[#333]'} flex flex-col items-center min-w-[70px] mt-[15px] cursor-pointer`} key={item}>
                                        <span>{$t(item)}</span>
                                        <SvgIcon
                                            className="dark:invert self-center"
                                            name={item}
                                            width={30}
                                            height={30}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>:''}
                    <div className="flex-1 p-[20px] overflow-auto">{children}</div>
                </div>
            </body>
        </html>
    );
}
