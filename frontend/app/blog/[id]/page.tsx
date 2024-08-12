"use client";
import { useParams } from "next/navigation";
import axios from "../../../axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/app/loading";
import Icon from '@mdi/react';
import { mdilThumbUp } from '@mdi/light-js';

const BlogPost = () => {
    const { id } = useParams();  // Деструктурируем id
    const [post, setPost] = useState<any>(null); // Инициализируем как null

    useEffect(() => {
        axios.get(`/blogpost?_id=${id}`)
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); // Добавляем id в зависимости

    if (!post) {
        return <Loading />
    }

    return (
        <div className="mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="relative">
                {post.photos && post.photos.length > 0 && (
                    <Image src={process.env.NEXT_PUBLIC_HOST + post.photos[0]} alt={post.name} width={500} height={300} className="w-full  rounded" /> // Добавляем width и height
                )}
                <div className=" cursor-pointer p-2 bg-slate-300 rounded-xl flex absolute right-4 top-4 items-center gap-3"><div>Понравилось</div> <Icon path={mdilThumbUp} size={0.9} className="mt-[-3px]" /></div>
                <div className=" absolute bottom-4 w-full flex justify-center"><div className="w cursor-pointer w-max items-center gap-3 p-2 bg-slate-300 rounded-xl flex ">{post.name}</div></div>
            </div>
            <div>
                {post.text}
            </div>
        </div>
    );
}

export default BlogPost;
