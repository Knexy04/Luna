"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from "@/app/components/slide";
import module from "@/app/components/components.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { useState, useEffect } from 'react';
import axios from '../../axios';
import Loading from '../loading';

const Slider = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/blogpost")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: any) => !collection.disabled);
                setPosts(filteredCollections);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (loading){
        return <Loading />
    }


    return (
        <div>
            <Swiper
                slidesPerView={1}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                }}
                navigation
                pagination={true}
                loop={true}
            >
                {posts.map((slide, index) => (
                    <SwiperSlide key={index} className={module.slide}>
                        <Slide slide={slide} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider