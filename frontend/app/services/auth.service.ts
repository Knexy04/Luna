import axios from "@/axios";

export class authService {

    static async sendCode(body: { phone: string }) {
        const {data} = await axios.post("/phone", body)
        return data
    }

    static async register(body: { phoneCode: number, name: string, phoneNumber: string, password: string }) {
        console.log(body)
        const {data} = await axios.post("/user", body)

        return data
    }

    static async login(body: { phoneNumber: string, password: string }) {
        const {data} = await axios.post("/auth", body)

        return data
    }

    static async passwordRecovery(body: { phone: string, password: string }) {
        const {data} = await axios.post("/passrecovery", body)

        return data
    }

    static async updatePassword(body: { oldPassword: string, password: string }) {
        const {data} = await axios.patch("/updatepass", body)

        return data
    }
    static async reloadPassword(body: { phoneCode: number, phoneNumber: string, password: string }){
        const {data} = await axios.patch("/reloadpass", body)

        return data
    }

    static async sendCodeReload(body: { phone: string }) {
        const {data} = await axios.patch("/checkphonereload", body)
        return data
    }

}