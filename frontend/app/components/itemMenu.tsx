'use client';
import Icon from "@mdi/react";
import module from "@/app/components/components.module.css";
import {mdilAccount, mdilCart, mdilHeart, mdilHome, mdilMenu} from "@mdi/light-js";
import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import {useGlobalContext} from "@/app/context/store";
import { catalogService } from "../services/catalog.service";

const fetchCategories = async () => {
    try {
        return await catalogService.getAllCategories(false);
    } catch (e:any) {
        throw new Error(e.data.response.message);
    }
}

const ItemMenu = () => {
    const [menu, setMenu] = useState(false);
    const [categories, setCategories] = useState([]);
    const {userData} = useGlobalContext();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            }
        };

        getCategories();
    }, []);

    return (
        <div className="h-fit w-fit mt-1.5">
            <div className={module.headerMobile}>
                <Link href="/" className="bg-back rounded-xl"><Icon className={module.headerIcon} path={mdilHome} size={1.2} /></Link>
                <button onClick={() => setMenu(!menu)} className="bg-back rounded-xl"><Icon className={module.headerIcon} path={mdilMenu} size={1.2} /></button>
                <Link href="/favourite" className="bg-back rounded-xl"><Icon className={module.headerIcon} path={mdilHeart} size={1.2} /></Link>
                <Link href="/cart" className="bg-back rounded-xl"><Icon className={module.headerIcon} path={mdilCart} size={1.2} /></Link>
                <Link href={userData ? "/profile" : "/auth"} className="bg-back rounded-xl"><Icon className={module.headerIcon} path={mdilAccount} size={1.2} /></Link>
            </div>

            <menu className={`${menu ? "h-full opacity-100" : "h-0 opacity-0"} ${module.menuMobile}`}>
                {menu && (
                    <div className="flex flex-col items-center justify-start pt-8 w-full px-4">
                        <aside className="flex flex-col w-full items-start gap-10 text-lg font-medium">
                            <div className="flex items-center w-full">
                                <Image src={logo.src} width={100} height={50} alt="logo" />
                                <span className="w-1 h-16 mx-4 border-r-2 border-r-black border-opacity-90" />
                                <Link className="bg-back text-center p-2 bg-opacity-60 w-full rounded-lg" href="/about">О нас</Link>
                            </div>
                            <section className="w-full bg-back rounded-xl p-4 flex flex-col gap-4 bg-opacity-25">
                                <Link className="bg-back p-2 bg-opacity-60 w-full rounded-lg" onClick={() => setMenu(!menu)} href="/blog">Beauty-блог</Link>
                                <div className="w-full h-[1px] bg-black bg-opacity-25" />
                                <div className="flex flex-col w-full items-start px-4 overflow-x-auto gap-4">
                                    {categories.map((category:any, index) => (
                                        <Link className="bg-back p-2 bg-opacity-60 w-full rounded-lg" href={`/catalog/${category.engName}`} onClick={() => setMenu(!menu)} key={index}>
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                )}
            </menu>
        </div>
    )
}

export default ItemMenu;
