"use client"
import module from "./components.module.css";
import Icon from '@mdi/react';
import {mdilCart} from '@mdi/light-js';
import Link from "next/link";
import Image from "next/image"
import {mdilHeart, mdilHeartOff} from '@mdi/light-js';
import {userService} from '@/app/services/user.service';
import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/store";
import {mdiCartRemove} from '@mdi/js';
import axios from "../../axios"
import {mdilAccount} from '@mdi/light-js';

interface CartCardProps {
    item: any;
}

const Item: React.FC<CartCardProps> = ({item}: CartCardProps) => {
    const [innerCart, setInnerCart] = useState(false);
    const [redHeart, setRedHeart] = useState(false);

    const {userData, setUserData} = useGlobalContext();

    useEffect(() => {
        if (userData?.cart) {
            for (let i = 0; i < userData.cart.length; i++) {
                if (userData.cart[i].item === item._id) {
                    setInnerCart(true);
                }
            }
        }
    }, [userData.cart, item._id]);

    const handleAddCartItem = () => {
        if (item) {
            axios.patch('/cart', {item: item._id})
                .then((res) => {
                    setInnerCart(true);
                    setUserData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleRemoveAddCartItem = () => {
        axios.delete(`/cart?item=${item._id}`)
            .then((res) => {
                setInnerCart(false);
                setUserData(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addToWishlist = async () => {
        try {
            axios.patch(`/wishlist`, {item: item._id})
                .then((res) => {
                    setRedHeart(true);
                    setUserData(res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {
            console.log(e);
        }
    };

    const removeFromWishlist = async () => {
        try {
            axios.delete(`/wishlist?item=${item._id}`)
                .then((res) => {
                    setRedHeart(false);
                    setUserData(res.data)
                })
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (item && userData && userData.favourite && Array.isArray(userData.favourite)) {
            const isFavourite = userData.favourite.some((favItem: any) => favItem === item._id);
            if (isFavourite) {
                setRedHeart(true);
            }
        }
    }, [userData, item]);

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className={module.card}>
            <div className={module.cardblock}>
                {
                    !userData._id ?

                        <Link href="/auth" className={`${module.favbutton}`}>
                            <Icon path={mdilAccount} size={1}/>

                        </Link>

                        : <>

                            <button
                                className={`${module.favbutton} ${item.stock > 0 && item.disabled === false ? "" : "cursor-no-drop"} `}
                                disabled={item.stock > 0 && item.disabled === false ? false : true}
                                onClick={innerCart ? handleRemoveAddCartItem : handleAddCartItem}>
                                {innerCart ? <Icon path={mdiCartRemove} size={0.9}/> : <Icon path={mdilCart} size={0.9}/>}
                            </button>
                            <button
                                className={module.favbutton}
                                onClick={redHeart ? removeFromWishlist : addToWishlist}
                            >
                                {!redHeart ? <Icon path={mdilHeart} size={0.9}/> : <Icon path={mdilHeartOff} size={0.9}/>}
                            </button>

                        </>
                }
            </div>

            <Link href={`/items/${item._id}`}>
                <div className={"flex flex-col gap-2"}>
                    <div className={'relative'}>
                        <Image className={"w-full object-cover h-[320px]"}
                               src={`${process.env.NEXT_PUBLIC_HOST}${item.photos[0]}`}
                               height={800} width={760} alt={""}/>
                        <div className={"flex flex-col"}>
                            <div className={module.itemline}>
                                <label className={"font-medium text-lg"}>{item.price[item.price.length - 1]}₽</label>
                                <p>{item.price[0]}₽</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <article className={"text-xl font-medium"}>{item.name}</article>
                        <p className={"opacity-70"}>{item.category.name}</p>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default Item;
