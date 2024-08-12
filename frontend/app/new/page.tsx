"use client"
import ItemList from "./[id]/itemlist"
import { useEffect, useState } from "react";
import Loading from "../loading";
import { catalogService } from "../services/catalog.service";

const CatalogPage = () => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await catalogService.getNewShowСaseFull();
                setItems(data);
            } catch (error) {
                console.error('Error fetching new:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="font-bold text-3xl -mb-6 md:mb-0">Новинки</div>
            <div>
                {items ? <ItemList doc={items} /> : <p>No items found</p>}
            </div>
        </div>
    );
}

export default CatalogPage;
