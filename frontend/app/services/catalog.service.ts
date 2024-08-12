import axios from "@/axios";

export class catalogService {
    static async getAllItems() {
        const {data} = await axios.get("/item")

        return data
    }

    static async getAllBrands() {
        const {data} = await axios.get("/brands")

        return data
    }

    static async getItemsByCategory(category:string) {
        const {data} = await axios.get(`/itemsCategory?category=${category}`)

        return data
    }

    static async getNew() {
        const {data} = await axios.get(`/new`)

        return data
    }

    static async getNewShowcase() {
        const {data} = await axios.get(`/newshowcase`)

        return data
    }

    static async getNewShowСaseFull() {
        const {data} = await axios.get(`/newshowcasefull`)

        return data
    }

    static async getTopSellers() {
        const {data} = await axios.get(`/topsellers`)

        return data
    }

    static async getTopShowcase() {
        const {data} = await axios.get(`/topshowcase`)

        return data
    }

    static async getCategory(id: string, sub: boolean) {
        const {data} = await axios.get(`/category?_id=${id}&sub=${sub}`)

        return data
    }

    static async getAllCategories(sub: boolean) {
        const {data} = await axios.get(`/category?sub=${sub}`)

        return data
    }

    static async getSelection(id: string) {
        const {data} = await axios.get(`/selection?:_id${id}`)

        return data
    }

    static async getSale(id:string) {
        const {data} = await axios.get(`/sale?:_id${id}`)

        return data
    }

    static async getSalesItems() {
        const {data} = await axios.get(`/sales`)

        return data
    }

    static async geAllSales() {
        const {data} = await axios.get(`/sale`)

        return data
    }

    static async getAllPosts() {
        const {data} = await axios.get("/blogpost")

        return data
    }

    static async getPost(id:string) {
        const {data} = await axios.get(`/blogpost?_id=${id}`)

        return data
    }
}