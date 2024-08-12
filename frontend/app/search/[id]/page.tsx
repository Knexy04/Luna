"use client"
import { useEffect, useState } from "react";
import ItemList from "./itemlist";
import axios from "../../../axios";
import Loading from "@/app/loading";

const Search = ({ params }: any) => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true)
    const decodedSearchTerm = decodeURIComponent(params.id);

    useEffect(() => {
        if (params && params.id) {
            const decodedSearchTerm = decodeURIComponent(params.id);
            console.log("Decoded Search Term:", decodedSearchTerm);
            setSearchTerm(decodedSearchTerm);
        }
    }, [params]);

    useEffect(() => {
        if (searchTerm) {
            axios.post("/search", { search: searchTerm })
                .then((res) => {
                    setItems(res.data);
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [searchTerm]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            
            <div className="flex flex-col gap-8">
                {items && items.length > 0 ? (
                    <>
                    <div className="flex text-xl">По запросу <span className="font-bold mx-3">{decodedSearchTerm}</span> найдено:</div>
                    <ItemList doc={items} />
                    </>
                    
                ) : (
                    <div className="flex text-xl h-[40vh] justify-center items-center">По запросу <span className="font-bold mx-3">{decodedSearchTerm}</span> ничего не найдено!</div>
                )}
            </div>
        </div>
    );
}

export default Search;
