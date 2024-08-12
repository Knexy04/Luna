export interface UserDataType {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    city: string,
    address: string,
    favourite: [ItemProps],
    search: [string],
    cart: [{
        item: ItemProps,
        quantity: {
            type: Number
        }
    }],
    orders: [OrderData],
    bought: [ItemProps],
    disabled: boolean,
    _id: string
}

export interface ItemProps{
    sold: number,
    disabled: boolean,
    _id: string,
    name: string,
    description: string,
    category: {
        _id: string,
        name: string,
    },
    tags: [
        {
            _id: string,
            name: string,
        }
    ],
    photos: [
        string
    ],
    price: [ number ],
    rating: number,
    reviews: [
        {
            rating: number,
            description: string,
            photos: [string],
            user: string,
            item: string
        }
    ],
    stock: number,
    brand: {name: string}
}

export interface OrderData {
    _id: string,
    items: [ItemProps],
    status: [StatusProps],
    date: Date,
    price: Number
}

export interface StatusProps {
    _id: string,
    name: string
}

export interface CategoryProps {
    _id: string,
    name: string,
    engName: string,
    disabled: boolean,
    subcategories: [SubCategory]
}

export interface SubCategory {
    _id: string,
    name: string,
    category: string,
    disabled: boolean,
    items: [ItemProps]
}

