"use client"
import { useState, useEffect, useContext } from "react"
import logo from "@/public/logo.svg"
import Icon from '@mdi/react';
import Image from "next/image"
import { mdilHeart } from '@mdi/light-js';
import { mdilCart } from '@mdi/light-js';
import { mdilAccount } from '@mdi/light-js';
import Search from "@/app/components/search";
import Link from "next/link";
import module from "./components.module.css"
import ItemMenu from "@/app/components/itemMenu";
import { GlobalContextProvider, useGlobalContext } from "@/app/context/store";
import { userService } from "@/app/services/user.service";


const Header = () => {

    const [auth, setAuth] = useState(false)
    const { userData, setUserData } = useGlobalContext()


    useEffect(() => {
        const checkAuth = async () => {
            if (!userData._id) {
                try {
                    const data = await userService.getUser();
                    setUserData(data)
                    setAuth(true)
                } catch (error) {
                    setAuth(false)
                } finally {
                }
            }
        };
        checkAuth();
    }, [userData, setUserData]);



    return (


        <header>

            <div className={"fixed top-0 w-full justify-center px-8 pt-4"}>
                <Search />
            </div>

            <div className={module.headerline}>
                <Link as="/" href={"/"}>
                    <Image src={logo.src} width={80} height={80} alt={"logo"} />
                </Link>
                <Search />
                <div className={"flex items-center gap-6"}>

                    {auth ? (
                        <>
                            <Link href={"/favourite"}>
                                <Icon className={module.icon} path={mdilHeart} size={1.3} />
                            </Link>
                            <Link href={"/cart"}>
                                <Icon className={module.icon} path={mdilCart} size={1.3} />
                            </Link>
                            <Link href={"/profile"}>
                                <Icon className={module.icon} path={mdilAccount} size={1.3} />
                            </Link>
                        </>
                    ) : (
                        <Link href={"/auth"}>
                            <Icon className={module.icon} path={mdilAccount} size={1.3} />
                        </Link>
                    )}
                </div>
            </div>


            <div>
                <div className={module.under}>
                    <Link href={"/catalog"}>каталог</Link>
                    <Link href={"/brands"}>бренды</Link>
                    <Link href={"/new"}>новинки</Link>
                    <Link href={"/sale"}>акции</Link>
                    <Link href={"/collections"}>подборки</Link>
                    <Link href={"/blog"}>beauty-блог</Link>
                </div>
            </div>

            <ItemMenu />


        </header>
    )
}

export default Header