"use client"
import Icon from "@mdi/react";
import { mdilChevronDown, mdilCurrencyRub } from "@mdi/light-js";
import React, { useState } from "react";
import OrderCard from "@/app/profile/orderCard";
import { ItemProps, UserDataType } from "@/app/dataTypes/Interfaces";
import Loading from "@/app/loading";

const Orders = ({ data }: { data: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!data.orders) {
        return <Loading />
    }

    const sortedOrders = [...data.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <section className={`border-2 rounded-2xl w-full transition-all border-main isOpen ${isOpen && "pb-8"}`}>
            <button onClick={() => setIsOpen(!isOpen)}
                className={`${!isOpen ? "overflow-hidden rounded-xl" : "rounded-t-2xl"} transition-all flex justify-between w-full bg-main p-8 items-center`}>
                <div className={`flex items-center gap-4`}>
                    <Icon path={mdilCurrencyRub} size={1} />
                    <p>Мои заказы</p>
                </div>
                <Icon className={"transition-all"} path={mdilChevronDown} size={1.2} rotate={isOpen ? 180 : 0} />
            </button>

            <div
                className={`${isOpen ? "h-fit flex opacity-100" : "hidden opacity-0 h-0"} transition-all flex-col gap-8`}>
                <div className={"flex flex-col gap-4 px-4 pt-4"}>
                    {
                        sortedOrders[0] ? (
                            sortedOrders.map((item: ItemProps) => (
                                <OrderCard key={item._id} order={item} />
                            ))) : (
                            <p className={"pt-4 text-center"}>Заказов пока что нет</p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Orders;