import axios from "@/axios";

export class userService {
    static async getUser() {
        const {data} = await axios.get("/user")
        return data
    }

    static async getWishlist() {
        const {data} = await axios.get("/wishlist")
        return data
    }

    static async getCart() {
        const {data} = await axios.get("/cart")

        return data
    }

    static async getSearch() {
        const {data} = await axios.get("/search")

        return data
    }

    static async updateUser(body: {
        firstName: string,
        phoneNumber: string,
        lastName: string,
        email: string,
        city: string,
        address: string
    }) {
        const {data} = await axios.patch("/user", body)

        return data
    }

    static async makeOrder(items:any, price: number, payment:any,  delivery:any, addres: string) {
        const {data} = await axios.post("/order", {items:items, price:price, payment:payment,  delivery:delivery, addres: addres })
        return data
    }

    static async searchAuth(body: { id: string, search: string }) {
        const {data} = await axios.post(`/search?:_id=${body.id}`, body)
        return data
    }

    static async search(search: string) {
        const {data} = await axios.post(`/search`, search)

        return data
    }

    static async addToWishlist(item:string) {
        const {data} = await axios.patch(`/wishlist`, {item: item})
        return data
    }

    static async removeFromWishlist(item:string) {
        
        const {data} = await axios.delete(`/wishlist?item=${item}`)

        return data
    }

    static async addToCart(item:string) {

        const {data} = await axios.patch('/cart', {item: item})

        return data
    }

    static async deleteFromCart(item:string) {
        const {data} = await axios.delete(`/cart?item=${item}`)

        return data
    }

    static async removefromcart(item:string) {
        const {data} = await axios.delete(`/removefromcart?itemId=${item}`)

        return data
    }

    static async addToSeen(item:string) {
        const {data} = await axios.patch(`/seen`, item)

        return data
    }

    static async usePromo(item:string, price:number) {
        const {data} = await axios.get(`/promo?code=${item}&&price=${price}`)

        return data
    }

    static async updatePromo(item:string) {
        const {data} = await axios.patch(`/promo?code=${item}`)

        return data
    }

}