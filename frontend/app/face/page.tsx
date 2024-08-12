"use client"
import ItemList from "./[id]/itemlist";
import { catalogService } from "@/app/services/catalog.service";
import { Categories } from "./categories";
import { useState, useEffect } from "react";
import axios from "../../axios";
import Loading from "../loading";

const Face = () => {
    const [items, setItems] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await catalogService.getAllItems();
                setItems(items);
            } catch (e: any) {
                console.error("Error fetching items:", e.message);
            }
        };

        fetchItems();

        axios.get("/facescategory")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: any) => !collection.disabled);
                setCollections(filteredCollections);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading){
        return <Loading />
    }

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="justify-around font-medium">
                <div className="text-2xl font-bold">Лицо</div>
                <Categories collections={collections} />
            </div>
            <div className="font-bold text-3xl -mb-6 md:mb-0">Для вас</div>
            <div>
                <ItemList doc={items} />
            </div>
        </div>
    );
};

export default Face;
