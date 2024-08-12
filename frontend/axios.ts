import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_HOST
});

instance.interceptors.request.use((config)=> {
    if (typeof window !== 'undefined') {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    
    return config
})

export default instance;
