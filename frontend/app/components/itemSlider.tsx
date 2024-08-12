'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import module from "./components.module.css";
import 'swiper/swiper-bundle.css';
import Item from "./item";
import React, { useEffect, useState } from 'react';
import {ItemProps} from "@/app/dataTypes/Interfaces";


interface ItemSliderProps {
    items: ItemProps[];
}

const ItemSlider: React.FC<ItemSliderProps> = ({ items }) => {
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
        <div className={`${module.itemrow}`}>
            <Swiper
                spaceBetween={8}
                pagination={{ clickable: true }}
                slidesPerView={windowSize.width >= 1368 ? 5 : windowSize.width >= 1280 ? 5 : windowSize.width >= 1024 ? 4 : windowSize.width >= 600 ? 3 : windowSize.width >= 420 ? 2 : 1}
                loop={false}
                style={{ paddingBottom: "3rem" }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Item item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItemSlider;