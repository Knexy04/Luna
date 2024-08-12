import module from "../components/components.module.css";
import Icon from '@mdi/react';
import {mdilArrowRight} from '@mdi/light-js';
import Link from "next/link";
import Image from "next/image";

interface ItemProps {
    item: {
        name?: string,
        image: string,
        _id?: string,
        photo: string
    };
}

const ItemForYou = ({ item }: ItemProps) => {
    return (
        <div className="mb-12">
            <div className="z-15">
                <Image className={`${module.divCard} object-cover`} src={process.env.NEXT_PUBLIC_HOST + item.photo} height={1920} width={1080} alt={""}/>
            </div>
            <div className="flex justify-center h-10 -mt-6">
                <Link className={`${module.buttonrow} w-11/12 z-20 transition-all hover:bg-slate-900 hover:bg-opacity-10 flex justify-between px-3 leading-9 items-center`} href={`/face/${item._id}`}>
                <div className="text-[12px] lg:text-[18px] overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</div>
                <div><Icon path={mdilArrowRight} size={1}/></div>
                </Link>
            </div>
        </div>
    );
}

export default ItemForYou;