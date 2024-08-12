"use client"
import ItemList from "./itemlist"
import { Categories } from "../categories";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";


const Catalog = ({ params }: any) => {

    const id = params.id

    const [items, setItems] = useState([])
    const [collection, setCollection] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/facescategory?_id=${id}`)
            .then((res) => {
                setCollection(res.data)
                setItems(res.data.items)
                setLoading(false)
            })
    }, [id])

    if (loading){
        return <Loading />
    }


    return (
        <div className="mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="text-xl">Товары из категории <b>{collection.name}</b>:</div>
            <div>
                {items ? (
                    <ItemList doc={items} />
                ) : (
                    <div className={"w-full flex justify-center items-center font-bold h-[40vh]"}>Нет товаров данного бренда!</div>
                )}
            </div>
        </div>
    );
}

export default Catalog;