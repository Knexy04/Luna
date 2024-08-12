import Link from "next/link";
import {mdilArrowRight} from "@mdi/light-js";
import Icon from "@mdi/react";
import ItemSlider from "@/app/components/itemSlider";
import {catalogService} from "../services/catalog.service";

const fetchShowcase = async (name: string) => {
    if (name === "Новинки") {
        try {
            return await catalogService.getNewShowcase()
        } catch (error) {
            console.error('Error fetching new:', error);
        }

    } else if (name === "Хиты продаж") {
        try {
            return await catalogService.getTopShowcase()
        } catch (error) {
            console.error('Error fetching new:', error);
        }

    } else {
        try {
            return await catalogService.getAllItems()
        } catch (error) {
            console.error('Error fetching new:', error);
        }
    }
}

const ItemShowcase = async ({name}: { name: string }) => {

    const items = await fetchShowcase(name)
    

    return (
        <div>
            <div className={"flex justify-between items-center mb-4 px-4 sm:px-8 lg:px-20"}>
                <article className={"text-xl font-semibold"}>{name}</article>
                <Link className={"rounded-3xl flex gap-4 bg-main p-2 px-4 hover:bg-opacity-70 transition-all shadow"}
                      href={"/new"}>смотреть все<Icon path={mdilArrowRight} size={1}/></Link>
            </div>
            <ItemSlider items={items}/>
        </div>
    );
};

export default ItemShowcase;