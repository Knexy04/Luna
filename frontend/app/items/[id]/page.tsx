"use client"
import module from './item.module.css';
import Item from '../../components/item';
import Icon from '@mdi/react';
import { mdilHeart, mdilHeartOff } from '@mdi/light-js';
import Images from "./images";
import { itemService } from '@/app/services/item.service';
import { catalogService } from '@/app/services/catalog.service';
import { ItemProps } from "@/app/dataTypes/Interfaces";
import axios from "../../../axios";
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import { useGlobalContext } from '@/app/context/store';
import StarRating from './starrating'; // Import the StarRating component

const ItemPage = ({ params }: { params: { id: string } }) => {
    const [item, setItem] = useState<any>(null);
    const [sellers, setSellers] = useState<ItemProps[]>([]);
    const [innerCart, setInnerCart] = useState(false);
    const [redHeart, setRedHeart] = useState(false);
    const { userData, setUserData } = useGlobalContext();
    const [canReview, setCanReview] = useState(false); // New state for review eligibility
    const [reviewData, setReviewData] = useState({ rating: 0, description: '' });
    const [loadingReview, setLoadingReview] = useState(false); // New state for form loading

    useEffect(() => {
        if (userData?.cart) {
            for (let i = 0; i < userData.cart.length; i++) {
                if (userData.cart[i].item === item?._id) {
                    setInnerCart(true);
                    break;
                }
            }
        }
    }, [userData.cart, item?._id]);

    useEffect(() => {
        if (userData?.favourite) {
            for (let i = 0; i < userData.favourite.length; i++) {
                if (userData.favourite[i] === item?._id) {
                    setRedHeart(true);
                    break;
                }
            }
        }
    }, [userData.favourite, item?._id]); // Include userData.favourite in the dependency array

    const handleRemoveAddCartItem = () => {
        window.location.href = "/cart";
    };

    const addToWishlist = async () => {
        try {
            axios.patch(`/wishlist`, { item: item?._id })
                .then((res) => {
                    setRedHeart(true);
                    setUserData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const removeFromWishlist = async () => {
        try {
            axios.delete(`/wishlist?item=${item?._id}`)
                .then((res) => {
                    setRedHeart(false);
                    setUserData(res.data);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedItem = await itemService.getItemById(params.id);
                const fetchedSellers = await catalogService.getTopShowcase();

                setItem(fetchedItem);
                setSellers(fetchedSellers);

                const reviewCheck = await axios.get(`/checkreview?id=${params.id}`);
                if (reviewCheck.status === 200) {
                    setCanReview(true);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [params.id, setUserData, userData.cart, userData.favourite]); // Include userData.favourite in the dependency array

    if (!item) {
        return <Loading />;
    }

    const handleAddCartItem = () => {
        axios.patch('/cart', { item: item._id })
            .then((res) => {
                setInnerCart(true);
                setUserData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRating = () => {
        let sum = 0;
        for (let i = 0; i < item.reviews.length; i++) {
            sum += item.reviews[i].rating;
        }
        return (sum / item.reviews.length).toFixed(1);
    };

    const handleReviewSubmit = async (e: any) => {
        e.preventDefault();
        setLoadingReview(true);

        try {
            await axios.post('/review', {
                item: item._id,
                rating: reviewData.rating,
                description: reviewData.description,
            });
            const updatedItem = await itemService.getItemById(params.id);
            setItem(updatedItem);
            setCanReview(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingReview(false);
        }
    };

    return (
        <div className="page 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4">
            <div className="pageInfo pt-20 sm:flex gap-x-8">
                <div className={module.imagesPc}>
                    <Images doc={item} />
                </div>
                <div className="item-info">
                    <div className="text-3xl mb-3 font-bold">
                        {item.name}
                    </div>
                    {
                        item.brand?.name ? <div className="text-xl mb-2">
                            Бренд: {item.brand.name}
                        </div> : ""
                    }
                    <div className="text-xl mb-2">
                        {item.category.name}
                    </div>
                    {
                        item.price.length > 1 ?
                            <div className="sm:text-2xl text-3xl mt-4 sm:mt-0 mb-4">
                                <b>
                                    Скидка {Math.round((item.price[0] - item.price[1]) / item.price[0] * 100)} %
                                </b>
                            </div>
                            : ""
                    }
                    <div className={module.imgesMobile}>
                        <Images doc={item} />
                    </div>
                    {
                        item.price.length > 1 ?
                            <div className="sm:text-2xl text-3xl mt-4 sm:mt-0">
                                <b>
                                    <span className="text-gray-600 line-through opacity-50">
                                        {item.price[item.price.length - 2]}<span className="ml-2">₽</span>
                                    </span>
                                </b>
                            </div>
                            : ""
                    }
                    <div className="sm:text-2xl sm:mb-8 text-3xl mb-4 mt-4 sm:mt-0">
                        <b>{item.price[item.price.length - 1]}<span className="ml-2">₽</span></b>
                    </div>
                    <div className="flex gap-6">
                        {
                            !userData._id ? <Link href="/auth" className={`${module.buttonOff} w-4/5 sm:w-auto`}>
                                Войти для заказа
                            </Link> : <>

                                {
                                    item.stock > 0 && item.disabled === false ? (
                                        innerCart ? (
                                            <button className={`${module.buttonOn} w-4/5 sm:w-auto`} onClick={() => handleRemoveAddCartItem()}>
                                                Добавлен в корзину
                                            </button>
                                        ) : (
                                            <button className={`${module.buttonOff} w-4/5 sm:w-auto`} onClick={() => handleAddCartItem()}>
                                                Добавить в корзину
                                            </button>
                                        )
                                    ) : <button className={`${module.buttonOffStock} w-4/5 sm:w-auto`}>
                                        Добавить в корзину
                                    </button>
                                }

                                <button className={module.buttonOff} onClick={redHeart ? removeFromWishlist : addToWishlist}>
                                    {redHeart ? <Icon path={mdilHeartOff} size={1} /> : <Icon path={mdilHeart} size={1} />}
                                </button>

                            </>
                        }

                    </div>
                    <div className='flex flex-col justify-end gap-1 mt-3'>
                        <div><p className='font-bold'>В наличии: {item.stock}шт</p></div>
                        <div><p className='font-bold'>Продано: {item.sold}шт</p></div>
                    </div>
                </div>
            </div>
            <div className="item-article mt-4">
                <div className="font-bold text-xl mb-6">ОПИСАНИЕ ТОВАРА</div>
                <div className={"pl-4"}><span className="font-bold">Описание</span><br />{item.description}</div>
            </div>
            <div className="item-article mt-4">
                <div className="font-bold text-xl mb-6 flex gap-3 items-center">Отзывы: {item.reviews.length > 0 ? <div>Рейтинг: {handleRating()}</div> : ""}</div>
                {
                    item.reviews.length > 0 ?
                        <div className="mb-6 flex flex-col gap-4">
                            <div>
                                <div><span className='font-bold'>Автор:</span> {item.reviews[item.reviews.length - 1].user.firstName} {item.reviews[item.reviews.length - 1].user.lastName}</div>
                                <div><span className='font-bold'>Отзыв:</span> {item.reviews[item.reviews.length - 1].description}</div>
                                <div className='flex items-center gap-2'><span className='font-bold'>Оценка:</span> <StarRating rating={item.reviews[item.reviews.length - 1].rating} /></div>
                            </div>
                            {item.reviews.length > 1 && <div>
                                <div><span className='font-bold'>Автор:</span> {item.reviews[item.reviews.length - 2].user.firstName} {item.reviews[item.reviews.length - 2].user.lastName}</div>
                                <div><span className='font-bold'>Отзыв:</span> {item.reviews[item.reviews.length - 2].description}</div>
                                <div className='flex items-center gap-2'><span className='font-bold'>Оценка:</span> <StarRating rating={item.reviews[item.reviews.length - 2].rating} /></div>
                            </div>}
                            {item.reviews.length > 2 && <div>
                                <div><span className='font-bold'>Автор:</span> {item.reviews[item.reviews.length - 3].user.firstName} {item.reviews[item.reviews.length - 3].user.lastName}</div>
                                <div><span className='font-bold'>Отзыв:</span> {item.reviews[item.reviews.length - 3].description}</div>
                                <div className='flex items-center gap-2'><span className='font-bold '>Оценка:</span> <StarRating rating={item.reviews[item.reviews.length - 3].rating} /></div>
                            </div>}
                        </div>
                        : <div className='font-bold text-xl mb-6'>Товар никто не оценил</div>
                }
            </div>
            {canReview && (
                <div className="item-article mt-4">
                    <div className="font-bold text-xl mb-6">Оставить отзыв</div>
                    <form onSubmit={handleReviewSubmit}>
                        <div className={`flex flex-col mb-4 ${module.inputDiv}`}>
                            <label htmlFor="rating" className="mb-2">Рейтинг:</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={reviewData.rating}
                                onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                                min="1"
                                max="5"
                                required
                                className={module.inputData}
                            />
                        </div>
                        <div className={`flex flex-col mb-4 ${module.inputDiv}`}>
                            <label htmlFor="description" className="mb-2">Отзыв:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={reviewData.description}
                                onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                                required
                                className={module.inputData}
                            ></textarea>
                        </div>
                        <button type="submit" className={`${module.buttonOff} w-full `} disabled={loadingReview}>
                            {loadingReview ? 'Отправка...' : 'Оставить отзыв'}
                        </button>
                    </form>
                </div>
            )}
            <div className="item-recommendations">
                <div className="text-2xl font-bold">С этим товаром покупают</div>
                <div className="cards grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mt-6">
                    {sellers.map((seller) => (
                        <div key={seller._id} className='mb-4'>
                            <Item item={seller} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItemPage;
