import module from "./components.module.css";
import Icon from '@mdi/react';
import Link from "next/link";
import Image from "next/image"
import {mdilArrowRight} from "@mdi/light-js";

const ItemArticle = (item) => {
    return (
        <div className="mb-12">
            <div className={`${module.divRounded} z-15 relative `}>
                <div className={`${module.blurdivCard2} z-40 `}>
                    <Image className={`${module.divCard2} object-cover`} src={item.item.image} height={1920} width={1080} alt={""}/>
                </div>
                <div className={`${module.divRounded} z-20`}>
                    <div className={`${module.textdiv} absolute top-0 left-0 px-8 text-black sm:w-4/12 w-5/12 h-full flex justify-center  flex-col`}>
                    <div className="font-bold text-xl">
                        {item.item.name}
                    </div>
                    <div className="text-sm">
                        {item.item.article}
                    </div>
                </div>

                </div>
                
            </div>
            <div className="flex justify-center h-10 -mt-6">
                <Link className= {`${ module.buttonrow } w-11/12 transition-all hover:bg-slate-900 hover:bg-opacity-10 z-20 flex justify-between px-4 leading-9 items-center`} href={"/catalog"}>
                    <div>{item.item.name}</div><div className=""><Icon path={mdilArrowRight} size={1}/></div>
                </Link>
            </div>
        </div>
    );
}
 
export default ItemArticle;