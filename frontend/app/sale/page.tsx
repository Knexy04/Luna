"use client";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Loading from "../loading";
import Image from "next/image";
import module from "./[id]/catalog.module.css";
import Link from "next/link";

const CatalogPage = () => {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState<any>([]);

    useEffect(() => {
        axios.get("/sales")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: any) => !collection.disabled);
                setSales(filteredCollections);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (sales.length === 0) {
        <div className={module.page}>
            <div className="mt-24 md:mt-14 mb-8 text-4xl font-bold">
                Акции
            </div>
            <div className="flex flex-col items-center gap-12">
                <div className={"w-full flex justify-center items-center font-bold h-[40vh]"}>Нет акций!</div>
            </div>
        </div>
    }

    return (
        <div className={module.page}>
            <div className="mt-24 sm:mt-14 mb-8 text-4xl font-bold">
                Акции
            </div>

            <div className="flex flex-col items-center gap-12">
                {sales.map((sale:any, index:number) => (
                    <Link href={`/sale/${sale._id}`} key={index} className="relative rounded-xl cursor-pointer">
                        <div className="relative">
                            <div className={module.imgbox} />
                            <Image
                                className={`${module.img} h-34`}
                                src={sale.photo}
                                width={1080}
                                height={420}
                                alt=""
                            />
                        </div>
                        <div className={module.text}>
                            <div className="text-3xl font-bold">{sale.name}</div>
                            <div className="text-xl">{sale.subtitle}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
