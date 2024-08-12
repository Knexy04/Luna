"use client"
import Item from '../../components/item';
import { useState, useRef, useEffect } from "react"
import module from './catalog.module.css'

const ItemList = (props) => {
    const [visibleItems, setVisibleItems] = useState(15);
    const sentinelRef = useRef(null);

    const loadMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 15);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreItems();
                }
            });
        });

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="cards grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                {props.doc.slice(0, visibleItems).map((item, index) => (
                    <div className={`mb-4 ${module.itemContainer}`} key={index}>
                        <Item item={item} />
                    </div>
                ))}
            </div>
            <div ref={sentinelRef} className={"w-full text-center font-bold mt-12"}>Вы долистали до конца</div>
        </>
    );
};

export default ItemList;
