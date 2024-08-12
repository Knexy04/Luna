"use client";

import {useState} from "react";
import module from "./components.module.css"
import Icon from '@mdi/react';
import {mdilMagnify} from '@mdi/light-js';
import Link from "next/link";
import {useRouter} from "next/navigation";

const Search = () => {

    const [search, setSearch] = useState("")
    const router = useRouter();

    const handleKeyPress = async (e: any) => {
        if (e.key === 'Enter' && search) {
            try {
                // Use the asynchronous version of router.push
                await router.push("/search/" + search);
            } catch (error) {
                console.error('Error navigating:', error);
            }
        }
    };

    return (
        <div className={module.search}>
            <input value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   onKeyDown={handleKeyPress}
                   className={module.searchinput}/>
            <Link onClick={(e) => !search && e.preventDefault()} href={"/search/" + search}><Icon path={mdilMagnify} className={module.icon} size={1.3}/></Link>
        </div>
    )
}

export default Search