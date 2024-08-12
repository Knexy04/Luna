import axios from "../../axios.js";

export class authService {

    static async getUser() {
        const {data} = await axios.get("/user")

        return data
    }

    static async login(body) {
        const {data} = await axios.post("/auth", body)

        return data
    }

    static async createAdmin(body) {
        const {data} = await axios.post("/admin", body)

        return data
    }

}