"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import module from "./components.module.css"
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import axios from '../../axios';

const Sale = () => {

    const [sales, setSales] = useState([])

    useEffect(() => {
        axios.get("/sales")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: any) => !collection.disabled);
                setSales(filteredCollections);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

    console.log(sales)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const slideContents = [
        <p key="1">Акции</p>,
        <p key="2">20%</p>,
        <p key="3">Скидки</p>,
        <p key="4">15%</p>,
        <p key="5">Акции</p>,
        <p key="6">30%</p>,
        <p key="7">Скидки</p>,
        <p key="8">50%</p>,
    ];

    const saleCards = [
        { title: "Заголовок", subtitle: "Подзаголовок", id: "1" },
        { title: "Заголовок", subtitle: "Подзаголовок", id: "2" },
        { title: "Заголовок", subtitle: "Подзаголовок", id: "3" },
        { title: "Заголовок", subtitle: "Подзаголовок", id: "4" },
    ]

    return (
        <div className={module.movingline}>
            <Swiper className="sample-slider my-2"
                spaceBetween={0}
                slidesPerView={5}
                modules={[Autoplay]}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false
                }}
                speed={10000}
                loop={true}
                allowTouchMove={false}

            >
                {slideContents.map((content, index) => (
                    <SwiperSlide key={index}>{content}</SwiperSlide>
                ))}
            </Swiper>
            <div className={"flex flex-col gap-4 py-6 "}>
                <article className={"text-xl font-semibold px-10"}>Акции</article>
                <div className={"flex w-full mt-4 gap-16 md:px-24 justify-center"}>
                    <Swiper className={"saleswiper"}
                        spaceBetween={0}
                        slidesPerView={windowSize.width >= 800 ? 2 : 1}
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                        }}
                        navigation
                        loop={true}
                    >

                        {sales.map((sale:any, index) => (
                            <SwiperSlide key={index}>
                                <div className={"xl:px-4 md:px-16 sm:px-16 px-12 flex flex-col items-center justify-center"}>
                                    <Link href={`/sale/${sale._id}`}>
                                        <Image className={"rounded-xl"}
                                            src={sale.photo}
                                            width={500}
                                            height={100} alt={""} />
                                        <div className={"flex flex-col px-4 gap-1"}>
                                            <label className={"font-bold text-2xl pt-2"}>{sale.name}</label>
                                            <label>{sale.subtitle}</label>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
            <Swiper className="sample-slider2 my-2"
                spaceBetween={0}
                slidesPerView={5}
                modules={[Autoplay]}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: true
                }}
                speed={10000}
                loop={true}
                allowTouchMove={false}

            >
                {slideContents.map((content, index) => (
                    <SwiperSlide key={index}>{content}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Sale;