'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import module from "@/app/components/components.module.css";
import 'swiper/swiper-bundle.css';
import ItemForYou from "@/app/components/itemforyou";
import React, {useEffect, useState} from 'react';
import {Pagination} from "swiper/modules";
import { useRef } from 'react';

const ItemSliderForYou = ({items}) => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

    const firstItemRef = useRef(null);

    useEffect(() => {
        const firstItem = firstItemRef.current;

        if (firstItem) {
            const firstItemHeight = firstItem.offsetHeight;
            const allItems = document.querySelectorAll(`.${module.item} .${module.divCard}`);

            allItems.forEach(item => {
                item.style.height = `${firstItemHeight}px`;
            });
        }
    }, [items]);

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
                spaceBetween={windowSize.width >= 1280 ? 32 : windowSize.width >= 1024 ? 16 : windowSize.width >= 420 ? 8 : 4}
                modules={[Pagination]}
                pagination={true}
                slidesPerView={ windowSize.width >= 1368 ? 4 : windowSize.width >= 1280 ? 3 : windowSize.width >= 1024 ? 3 : windowSize.width >= 600 ? 2 : windowSize.width >= 420 ? 2 : 1}
                loop={false}
            >
                {items.map((item, index) => (
                        <SwiperSlide
                            key={index}>
                            <ItemForYou item={item} />
                        </SwiperSlide>
                ))}
            </Swiper>
        </div>
     );
}
 
export default ItemSliderForYou;