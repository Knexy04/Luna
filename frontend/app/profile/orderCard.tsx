import Link from "next/link";
import {JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal} from "react";
import Image from "next/image";
import Icon from '@mdi/react';
import {mdilClock} from '@mdi/light-js';
import {mdilCheck} from '@mdi/light-js';

const OrderCard = ({order}: any) => {

    const date = new Date(order.date).toLocaleDateString()

    console.log(order)

    return (
        <div className={"w-full flex flex-col lg:flex-row bg-main bg-opacity-25 rounded-2xl gap-8 p-2 lg:p-4"}>
            <aside className={"w-full lg:w-1/2 p-2 lg:p-4"}>
                <div className={"flex font-bold justify-between mb-2 bg-black text-back p-2 px-4 rounded-3xl bg-opacity-80 lg:mb-4"}><p>Товары:</p><p>{order.price} ₽</p></div>
                <div className={"w-full flex flex-col gap-2"}>
                    {order.items.map((item: any, index: Key | null | undefined) => (
                        <div key={item._id} className={"flex gap-4 w-full bg-main bg-opacity-50 p-2 rounded-2xl"}>
                            <Image className={"rounded-2xl"} src={process.env.NEXT_PUBLIC_HOST + item.photos[0]} alt={""} width={"128"}
                                   height={"128"}/>
                            <div className={"flex flex-col w-full gap-4"}>
                                <aside className={"flex justify-between bg-black bg-opacity-80 h-fit p-2 px-4 rounded-3xl text-back"}>
                                    <label className={"font-bold"}>{item.name}</label>
                                    <label>{item.price[item.price.length-1]} ₽</label>
                                </aside>
                                <p>{item.category.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            <aside className={"w-full lg:w-1/2 px-2 flex gap-4 flex-col"}>
                <div className={"bg-main p-4 rounded-2xl bg-opacity-50"}>
                    <label className={"font-bold"}>Статус заказа</label>
                    <div className={"flex flex-col gap-4 mt-2"}>
                        {order.status.map((item:any, index: Key | null | undefined) => (
                            <h1 className={(index === 0 ? "font-medium text-base" : "text-sm") + " flex gap-2 items-center"}
                                key={index}>{index === 0 ? <Icon path={mdilClock} size={0.8}/> :
                                <Icon path={mdilCheck} size={0.7}/>}{item.statusName}</h1>
                        ))}
                    </div>
                </div>
                <div className={"text-sm font-light flex justify-between"}>
                    <label>Заказ №{order._id}</label>
                    <label>Заказ от {date}</label>
                    
                </div>
                <label>Трек-номер: {order.track!=="" ? order.track : "-"}</label>
            </aside>

        </div>
    )
}

export default OrderCard;