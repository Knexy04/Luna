import {catalogService} from "@/app/services/catalog.service";
import Link from "next/link";
import {CategoryProps} from "@/app/dataTypes/Interfaces";

const fetchCategories = async () => {
    try {
        return await catalogService.getAllBrands()
    } catch (e: any) {
        throw Error(e.data.response.message)
    }
}

export const Categories = async ({params}: any) => {
    const categories = await fetchCategories()

    return (
        <div className="lg:flex hidden justify-around font-medium gap-4">
            {
                categories.map((category:CategoryProps)=> (
                    <Link className={`${category.name === params ? "decoration-gray-900" : "decoration-transparent"} transition-all  hover:decoration-gray-500 underline-offset-4 underline`} key={category._id} href={`/brands/${category.name}`}>
                        {category.name}
                    </Link>
                ))
            }
        </div>
    )
}