"use client"
import ItemList from "./itemlist"
import {Categories} from "@/app/brands/categories";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

const Catalog = ({params}: any) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/brands?brand=${params.id}`)
            .then((res) => {
                setItems(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.id]) 

    if (loading){
        return <Loading/>
    }

    return (
        <div className="mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <Categories params={params.id} />
            <div>
                {items.length > 0 ? (
                    <ItemList doc={items} />
                ) : (
                    <div className={"w-full flex justify-center items-center font-bold h-[40vh]"}>Нет товаров данного бренда!</div>
                )}
            </div>
        </div>
    );
}

export default Catalog;
