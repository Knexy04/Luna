"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../../axios";
import ItemForYou from "../components/itemforyou";
import Loading from "../loading";

export const Categories = ({ params }: any) => {

    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/collections")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: any) => !collection.disabled);
                setCollections(filteredCollections);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (loading){
        return <Loading />
    }


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {
                collections.map((collection:any) => (
                    <ItemForYou key={collection._id} item={collection} />
                ))
            }
        </div>
    )
}