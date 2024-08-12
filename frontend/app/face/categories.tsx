"use client"
import ItemForYou from "./itemforyou";

export const Categories = ({ collections }: any) => {


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {
                collections.map((collection:any) => (
                    <ItemForYou key={collection._id} item={collection} />
                ))
            }
        </div>
    )
}