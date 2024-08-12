"use client"
import { useEffect, useState } from "react";
import ItemList from "./itemlist"
import axios from "../../../axios"
import Loading from "@/app/loading";


const Catalog = ({params}: any) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState((true))
    const [sale, setSale] = useState<any>([])

    useEffect(()=>{
        axios.get(`/sale?_id=${params.id}`)
        .then((res)=>{
            setItems(res.data.items)
            setSale(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [params.id])

    if (loading){
        return <Loading/>
    }

    return (
        <div className="mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="mb-8 text-4xl font-bold">
                {sale.name}
            </div>
            <div>
                {items ? (
                    <ItemList doc={items}/>
                ) : (
                    <div className={"w-full flex justify-center items-center font-bold h-[40vh]"}>Нет товаров данной акции!</div>
                )}
            </div>
        </div>
    );
}

export default Catalog;