"use client"
import { useEffect } from "react";

const ButtonExit = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            window.location.href = '/auth';
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    };

    return ( 
        <div className='flex justify-end'>
            <button onClick={logout} className='bg-black text-white px-4 py-2 rounded-2xl'>Выйти из аккаунта</button>
        </div>
     );
}
 
export default ButtonExit;