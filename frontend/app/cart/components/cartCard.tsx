"use client"
import module from '../cart.module.css';
import Image from "next/image";
import Icon from "@mdi/react";
import { mdilHeart, mdilDelete, mdilMinus, mdilPlus, mdilHeartOff } from "@mdi/light-js";
import { useEffect, useState } from 'react';
import { userService } from '@/app/services/user.service';
import axios from "../../../axios"

interface CartCardProps {
    item: any;
    cartItems: any[];
    setCartItems: (items: any[]) => void;
    userData: any;
    setUserData: any
}

const CartCard = ({ item, cartItems, setCartItems, userData, setUserData }: CartCardProps) => {
    const [itemQuantity, setItemQuantity] = useState(item.quantity);
    const [redHeart, setRedHeart] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const updateCartItems = (newQuantity: number) => {
        const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.item._id === item.item._id) {
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        }).filter(cartItem => cartItem.quantity > 0);
        setCartItems(updatedCartItems);
    };

    const handleAddCartItem = async () => {
        if (item && !isProcessing) { // Проверяем, что процесс изменения количества товара не запущен
            setIsProcessing(true); // Устанавливаем состояние, что процесс начался
            axios.patch('/cart', { item: item.item._id })
                .then((res) => {
                    setUserData(res.data)
                    const newQuantity = itemQuantity + 1;
                    setItemQuantity(newQuantity);
                    updateCartItems(newQuantity);
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setTimeout(() => {
                        setIsProcessing(false); // По завершении таймера сбрасываем состояние
                    }, 500); // Устанавливаем таймаут в 1 секунду
                });
        }
    };

    const handleRemoveAddCartItem = async () => {
        if (!isProcessing) { // Проверяем, что процесс изменения количества товара не запущен
            setIsProcessing(true); // Устанавливаем состояние, что процесс начался
            axios.delete(`/cart?item=${item.item._id}`)
                .then((res) => {
                    setUserData(res.data)
                    const newQuantity = itemQuantity - 1;
                    setItemQuantity(newQuantity);
                    updateCartItems(newQuantity)
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setTimeout(() => {
                        setIsProcessing(false); // По завершении таймера сбрасываем состояние
                    }, 500); // Устанавливаем таймаут в 1 секунду
                });
        }
    };

    const addItemQuality = async () => {
        try {
            handleAddCartItem()
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteItemQuality = async () => {
        try {
            if (itemQuantity == 1) {
                deleteItem()
                return
            }
            handleRemoveAddCartItem()
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteItem = async () => {
        try {
            axios.delete(`/removefromcart?itemId=${item.item._id}`)
                .then((res) => {
                    setUserData(res.data)
                })
            updateCartItems(0);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    useEffect(() => {
        if (userData && userData.favourite && Array.isArray(userData.favourite)) {
            const isFavourite = userData.favourite.some((favItemId: string) => favItemId === item.item._id);
            if (isFavourite) {
                setRedHeart(true);
            }
        }
    }, [userData, item.item._id]);

    const addToWishlist = async () => {
        try {
            axios.patch(`/wishlist`, { item: item.item._id })
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
            axios.delete(`/wishlist?item=${item.item._id}`)
                .then((res) => {
                    setRedHeart(false);
                    setUserData(res.data)
                })
        } catch (e) {
            console.log(e);
        }
    };

    if (itemQuantity === 0) {
        return null;
    }

    const itemPrice = item.item.price[item.item.price.length - 1] * itemQuantity;


    return (
        <div className={"flex flex-col gap-4 lg:flex-row h-fit p-2 bg-main bg-opacity-25 rounded-2xl"}>
            <aside className={"flex w-full gap-4"}>
                <div className="rounded-2xl lg:w-auto lg:h-auto">
                    <Image
                        className={"rounded-2xl lg:w-64"}
                        src={item.item.photos?.[0].startsWith('h')  ? item.item.photos?.[0] : `http://localhost:4444${item.item.photos?.[0]}`  }
                        width={200}
                        height={200}
                        alt=""
                    />
                </div>
                <div className={"w-full flex flex-col gap-2"}>
                    <h1 className={`${module.nameProduct} w-fit rounded-3xl text-xl font-bold`}>{item.item.name}</h1>
                    <h1 className={`${module.categoryProduct}`}>{item.item.category?.name}</h1>
                    <div className={"lg:flex hidden"}>
                        <div>
                            <div className={`${module.buttonCounter} flex h-10 bg-black text-back bg-opacity-80 justify-between rounded-full px-2 items-center p-1 w-36`}>
                                <button onClick={() => deleteItemQuality()}>
                                    <div><Icon path={mdilMinus} size={1} /></div>
                                </button>
                                <div>{itemQuantity}</div>
                                {item.item.stock > itemQuantity ? <button onClick={() => addItemQuality()}>
                                    <div><Icon path={mdilPlus} size={1} /></div>
                                </button> : <button className='cursor-no-drop'>
                                    <div><Icon path={mdilPlus} size={1} /></div>
                                </button>}

                            </div>
                        </div>
                    </div>
                    <p className={"flex p-2 px-4 bg-black bg-opacity-80 text-back w-fit rounded-3xl lg:hidden text-xl"}>
                        {itemPrice} ₽
                    </p>
                </div>
            </aside>
            <aside className={"lg:flex hidden flex-col gap-4 items-end"}>
                <div className={"text-xl bg-opacity-80 p-2 px-4 bg-black text-back flex gap-2 rounded-3xl"}>
                    {itemPrice} <p>₽</p>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <button className={module.favbutton} onClick={redHeart ? removeFromWishlist : addToWishlist}>
                        {redHeart ? <Icon path={mdilHeartOff} size={1} /> : <Icon path={mdilHeart} size={1} />}
                    </button>
                    <button className={module.favbutton} onClick={() => deleteItem()}>
                        <Icon path={mdilDelete} size={1} />
                    </button>
                </div>
            </aside>
            <section className={"flex lg:hidden items-center justify-between"}>
                <div>
                    <div className={`${module.buttonCounter} flex h-10 bg-black text-back bg-opacity-80 justify-between rounded-full px-2 items-center p-1 w-36`}>
                        <button onClick={() => deleteItemQuality()}>
                            <div><Icon path={mdilMinus} size={1} /></div>
                        </button>
                        <div>{itemQuantity}</div>
                        <button onClick={() => addItemQuality()}>
                            <div><Icon path={mdilPlus} size={1} /></div>
                        </button>
                    </div>
                </div>
                <div className={"flex gap-2"}>
                    <button className={module.favbutton} onClick={redHeart ? removeFromWishlist : addToWishlist}>
                        {redHeart ? <Icon path={mdilHeartOff} size={1} /> : <Icon path={mdilHeart} size={1} />}
                    </button>
                    <button className={module.favbutton} onClick={() => deleteItem()}>
                        <Icon path={mdilDelete} size={1} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CartCard;
