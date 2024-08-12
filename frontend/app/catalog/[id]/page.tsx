import ItemList from "./itemlist";
import { catalogService } from "@/app/services/catalog.service";
import { Categories } from "@/app/catalog/categories";
import { CategoryProps, ItemProps, SubCategory } from "@/app/dataTypes/Interfaces";

const fetchItems = async (category: string) => {
    try {
        return await catalogService.getItemsByCategory(category);
    } catch (e: any) {
        throw Error(e.response.data.message);
    }
};

const Catalog = async ({ params }: any) => {
    const category: CategoryProps = await fetchItems(params.id);

    if (!category) {
        return (
            <div className={"mt-32 w-full text-center"}>
                <Categories params={params.id}/>
                <div className={"mt-24 font-bold"}>Ничего не найдено!</div>
            </div>
        );
    }

    const items: ItemProps[] = [];

    category.subcategories.forEach((sub: SubCategory) => {
        if (!sub.disabled) {
            sub.items.forEach((item: ItemProps) => items.push(item));
        }
    });

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <Categories params={params.id}/>
            <div>
                {items.length > 0 ? (
                    <ItemList doc={items}/>
                ) : (
                    <div className={"mt-32 w-full text-center"}>Ничего не найдено!</div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
