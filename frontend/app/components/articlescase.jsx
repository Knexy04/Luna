import Link from "next/link";
import {mdilArrowRight} from "@mdi/light-js";
import Icon from "@mdi/react";
import Articles from "@/app/components/articles";


const ArticlesCase = ({name}) => {

    const items =
        [
            {
                id: "1",
                name: "Духи",
                image: "https://www.aroma-butik.ru/images/categories/goods_full/1535746461_28875_Christian_Dior_Parfum_i.jpg",
                article: "lorem lorem lorem lorem lov vv loremlo remlore mlore mloremv loremlorem lorem lorem"
            },
            {
                name: "Помада",
                image: "https://visagehall.ru/upload/resize_cache/webp/upload/iblock/679/67947beb53f345bf14bddb540eec50fd.webp",
                id: "2",
                article: "lorem lorem lorem lorem lorem lorem lorem lorem oreml oremloremv loremlorem lorem lorem"

            }, 
            {
                name: "Духи",
                image: "https://visagehall.ru/upload/resize_cache/webp/upload/iblock/679/67947beb53f345bf14bddb540eec50fd.webp",
                id: "3",
                article: "lorem lorem lorem lorem  v vv loremlor emlor mlorem oremv loremlorem lorem lorem"

            },
            {
                id: "1",
                name: "Духи",
                image: "https://www.aroma-butik.ru/images/categories/goods_full/1535746461_28875_Christian_Dior_Parfum_i.jpg",
                article: "lorem lorem lorem lorem  loreml oreml oremlorem loremv loremlorem lorem lorem"

            },
        ]


    return (
        <div>
            <div className={"flex justify-between items-center mb-4 px-4 sm:px-8 lg:px-20"}>
                <article className={"text-xl font-semibold"}>{name}</article>
                <Link className={"rounded-3xl flex gap-4 bg-main p-2 px-4 hover:bg-opacity-70 transition-all shadow"}
                      href={"/new"}>смотреть все<Icon path={mdilArrowRight} size={1}/></Link>
            </div>
            <Articles items={items}/>
        </div>
    );
};

export default ArticlesCase;