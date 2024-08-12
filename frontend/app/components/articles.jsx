'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import module from "@/app/components/components.module.css";
import 'swiper/swiper-bundle.css';
import ItemArticle from "@/app/components/itemarticle";
import React, {useEffect, useState} from 'react';
import {Pagination} from "swiper/modules";

const Articles = ({items}) => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

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

    return (
        <div className={"md:px-24 px-6"}>
            <Swiper
                spaceBetween={32}
                modules={[Pagination]}
                pagination={true}
                slidesPerView={ windowSize.width >= 1368 ? 2 : windowSize.width >= 1280 ? 2 : windowSize.width >= 1024 ? 1 : windowSize.width >= 600 ? 1 : windowSize.width >= 420 ? 1 : 1}
                loop={false}
            >
                {items.map((item, index) => (
                        <SwiperSlide
                            key={index}>
                            <ItemArticle item={item} />
                        </SwiperSlide>
                ))}
            </Swiper>
        </div>
     );
}
 
export default Articles;