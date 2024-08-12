import ItemList from "./[id]/itemlist"
import {catalogService} from "@/app/services/catalog.service";
import { Categories } from "./categories";

const fetchItems = async () => {
    try {
        return await catalogService.getAllItems()
    } catch (e:any) {
        throw Error(e.data.response.message)
    }
}

const CatalogPage = async () => {

    const items = await fetchItems()

    return (
        <div className="mt-24 md:mt-14 2xl:px-48 xl:px-36 lg:px-24 md:px-16 sm:px-16 px-4 page">
            <div className="lg:flex hidden justify-around font-medium">
                <Categories/>
            </div>
            <div className="font-bold text-3xl -mb-6 md:mb-0">Для ваc</div>
            <div>
                <ItemList doc={items} />
            </div>
        </div>
    );
}
 
export default CatalogPage;