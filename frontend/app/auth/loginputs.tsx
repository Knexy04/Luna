"use client"
import { useState } from "react";
import module from "./auth.module.css";
import { authService } from "../services/auth.service";

const LoginInputs = () => {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const handleInputPhone = (event:any) => {
        let inputValue = event.target.value;

        if (inputValue[0] === '+') {
            inputValue = '+' + inputValue.substring(1).replace(/\D/g, '');
            if (inputValue.length > 12) {
                inputValue = inputValue.substring(0, 12);
            }
        } else {
            inputValue = inputValue.replace(/\D/g, '');
            if (inputValue.length > 11) {
                inputValue = inputValue.substring(0, 11);
            }
        }

        setPhone(inputValue);
    }

    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            const response = await authService.login({phoneNumber: phone, password})
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        } catch (error:any) {
            setError(error.response.data.message);
        }
    };

    return (
        <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
            <div className={module.inputrow}>
                <label htmlFor={"phone"}>Номер телефона</label>
                <input
                    type={"tel"}
                    id={"phone"}
                    className={module.input}
                    value={phone}
                    onChange={handleInputPhone}
                />
            </div>
            <div className={module.inputrow}>
                <label htmlFor={"password"}>Пароль</label>
                <input
                    className={module.input}
                    type={"password"}
                    id={"password"}
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            {error && <p>{error}</p>}
            <button
                type="submit"
                className={"bg-transparent border-slate-950 border-2 border-opacity-70 rounded-xl h-10 hover:bg-slate-900 hover:text-emerald-50 transition-all"}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginInputs;
