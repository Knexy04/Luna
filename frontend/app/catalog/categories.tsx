import {catalogService} from "@/app/services/catalog.service";
import Link from "next/link";
import {CategoryProps} from "@/app/dataTypes/Interfaces";

const fetchCategories = async () => {
    try {
        return await catalogService.getAllCategories(false)
    } catch (e: any) {
        throw Error(e.data.response.message)
    }
}

export const Categories = async ({params}: any) => {
    const categories = await fetchCategories()

    console.log(categories)

    return (
        <div className="lg:flex hidden justify-around font-medium gap-4">
            {
                categories.map((category:CategoryProps)=> (
                    <Link className={`${category.engName === params ? "decoration-gray-900" : "decoration-transparent"} transition-all  hover:decoration-gray-500 underline-offset-4 underline`} key={category._id} href={`/catalog/${category.engName}`}>
                        {category.name}
                    </Link>
                ))
            }
        </div>
    )
}