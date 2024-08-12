"use client"
import { useEffect, useState } from 'react';
import module from './blog.module.css';
import Image from "next/image";
import axios from '../../axios';
import Link from 'next/link';
import Loading from '../loading';

interface BlogPost {
    _id: string;
    name: string;
    description: string;
    photos: string[];
    disabled: boolean;
}

const Blog = () => {

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/blogpost")
            .then((res) => {
                const filteredCollections = res.data.filter((collection: BlogPost) => !collection.disabled);
                setPosts(filteredCollections);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={module.page}>
            <div className="mt-24 md:mt-14 mb-8 text-4xl font-bold">
                Beauty-blog
            </div>

            <div className={"flex flex-col items-center gap-12"}>
                {
                    posts.map((item, index) => (
                        <Link href={`/blog/${item._id}`} key={index} className={"relative rounded-xl cursor-pointer"}>
                            <div className={"relative"}>
                                <div className={module.imgbox} />
                                <Image className={`${module.img} h-84`}
                                    src={process.env.NEXT_PUBLIC_HOST + item.photos[0]}
                                    width={1420}
                                    height={668}
                                    alt={""}
                                />
                            </div>
                            <div className={`${module.text}`}>
                                <div className="text-3xl font-bold">{item.name}</div>
                                <div className="text-sm">{item.description}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Blog;
