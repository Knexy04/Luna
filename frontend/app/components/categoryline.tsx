"use client"
import {useState} from "react"
import Link from "next/link";
import module from "./components.module.css"

const CategoryLine = () => {

    const [menu, setMenu] = useState(false)

    const categories = {
        categories:[
            {name: 'волосы', link: 'hair'},
            {name: 'лицо', link: 'face'},
            {name: 'руки', link: 'hands'},
            {name: 'тело', link: 'body'},
            {name: 'ноги', link: 'legs'},
            {name: 'для мужчин', link: 'for_men'},
        ]
    }

    return ( 
        <div className={module.underCatalog}>
        {categories.categories.map((category, index) => (
            <Link
                href={"/catalog/" + category.link} key={index}>
                <div onClick={() => { setMenu(!menu); }} className="">
                    {category.name}
                </div>
            </Link>
            ))}
        </div>
    );
}
 
export default CategoryLine;