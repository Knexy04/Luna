"use client"
import { userService } from '../services/user.service';
import CartCard from './components/cartCard';
import Steps from "./components/steps";
import { useEffect, useState } from "react";
import { catalogService } from "../services/catalog.service";
import { useGlobalContext } from "@/app/context/store";
import Loading from '../loading';

const Cart = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [doc, setDoc] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { userData, setUserData } = useGlobalContext();

    const [isAuthorized, setIsAuthorized] = useState(false);

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
        const checkAuth = async () => {
            try {
                const data = await userService.getUser();
                setUserData(data);
            } catch (error) {
                console.error(error);
            }
        };
        checkAuth();
    }, [setUserData]);

    useEffect(() => {
        const fetchShowcase = async () => {
            try {
                setDoc(await catalogService.getNewShowcase());
            } catch (error) {
                console.error('Error fetching new showcase:', error);
            }
        };
        fetchShowcase();
    }, []);

    useEffect(() => {
        const getCartData = async () => {
            try {
                const response = await userService.getCart();
                setCartItems(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(true);
            }
        };
        getCartData();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            return cartItems.reduce((total, item) => {
                if (item.item.price && item.item.price.length > 0) {
                    return total + item.item.price[0] * item.quantity;
                }
                return total;
            }, 0);
        };
        setTotalPrice(calculateTotalPrice());
    }, [cartItems]);

    useEffect(() => {
        const calculateTotalSale = () => {
            return cartItems.reduce((total, item) => {
                if (item.item.price && item.item.price.length > 1) {
                    return total + (item.item.price[0] - item.item.price[1]) * item.quantity;
                }
                return total;
            }, 0);
        };
        setTotalSale(calculateTotalSale());
    }, [cartItems]);

    if (!isLoading || !isAuthorized) {
        return <Loading />;
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="pt-10 px-2 lg:px-12 lg:pt-24">
                    <div className="mt-10 pl-4 lg:pl-24 font-bold text-3xl mb-4">Корзина</div>
                    <div className="flex justify-center items-center h-[50vh]">
                        <div className="text-2xl">Корзина пуста</div>
                    </div>
                </div>
            ) : (
                <div className="pt-10 px-2 lg:px-12 lg:pt-24">
                    <div className="mt-10 pl-4 lg:pl-24 font-bold text-3xl mb-4">Корзина</div>
                    <div className="md:px-16 flex flex-col gap-4 xl:px-36">
                        {cartItems.map((item) => (
                            <CartCard key={item.item._id} item={item} cartItems={cartItems} setCartItems={setCartItems} userData={userData} setUserData={setUserData} />
                        ))}
                    </div>
                    <Steps userData={userData} price={totalPrice} sale={totalSale} cartItems={cartItems} setCartItems={setCartItems} doc={doc} />
                </div>
            )}
        </>
    );
};

export default Cart;
