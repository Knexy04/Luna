"use client"
import ItemList from "./[id]/itemlist";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loading from "../loading";
import { useGlobalContext } from "../context/store";

const CatalogPage = () => {
    const [items, setItems] = useState([]);
    const [zerFv, setZeroFv] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const { userData } = useGlobalContext();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/auth";
            } else {
                setIsAuthorized(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            axios.get('/wishList')
                .then((res) => {
                    setItems(res.data);
                    if (res.data.length === 0) {
                        setZeroFv(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isAuthorized]);

    if (isAuthorized === null || !userData._id) {
        return <Loading />;
    }

    if (zerFv && items.length === 0) {
        return <div className="text-xl flex justify-center text-bold mt-[180px] min-h-[90vh] text-black">Понравившихся товаров нет!</div>;
    }

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="font-bold text-3xl -mb-6 md:mb-0">Понравившиеся товары</div>
            <div>
                {items.length === 0 ? <Loading /> : <ItemList doc={items} />}
            </div>
        </div>
    );
}

export default CatalogPage;
