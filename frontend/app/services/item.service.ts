import axios from "@/axios";

export class itemService {
    static async getItemById(id: string) {
        const {data} = await axios.get(`/item?_id=${id}`)
        
        return data
    }

    static async postReview(body: { item: string, rating: number, description: string, photos: [string], }) {
        const {data} = await axios.post(`/review`, body)

        return data
    }

    static async deleteReview(id: string) {
        const {data} = await axios.delete(`/review?_id=${id}`)

        return data
    }

    static async addToCart(id: string) {
        const {data} = await axios.delete(`/review?_id=${id}`)
        
        return data
    }

}