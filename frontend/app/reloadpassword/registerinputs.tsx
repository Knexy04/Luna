"use client"
import React, { useState, useEffect } from "react";
import module from "./register.module.css";
import { authService } from "../services/auth.service";

const RegisterInputs = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("")

    const intervalRef = React.useRef<number | undefined>(undefined);

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleCodeChange = (event: any) => {
        setCode(event.target.value);
    };

    const handleSendCode = async (event: any) => {
        event.preventDefault();
        try {
            const response = await authService.sendCodeReload({ phone })
            setCodeSent(true);
            startTimer();
        } catch (error: any) {
            setError1(error.response.data.message);
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await authService.reloadPassword({phoneNumber: phone, phoneCode: parseInt(code), password: password })
            localStorage.setItem('token', response.token);
            window.location.href = '/profile';
        } catch (error: any) {
            setError(error.response.data.message);
        }
    }

    const startTimer = () => {
        setError("");
        if (intervalRef.current !== undefined) {
            clearInterval(intervalRef.current);
        }
        setTimer(90);
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000) as any;
    };


    const handleResendCode = (event: any) => {
        clearInterval(intervalRef.current);
        startTimer();
        handleSendCode(event)
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
                <div className={module.inputrow}>
                    <label htmlFor={"phone"}>Номер телефона</label>
                    <input
                        type={"tel"}
                        id={"phone"}
                        className={module.input}
                        value={phone}
                        onChange={handlePhoneChange}
                        disabled={codeSent}
                    />
                </div>
                {error1 && !codeSent && <p>{error1}</p>}
                {codeSent ? (
                    <>
                        <div className={module.inputrow}>
                            <label htmlFor={"code"}>Код проверки</label>
                            <input
                                type={"text"}
                                id={"code"}
                                className={module.inputcode}
                                value={code}
                                onChange={handleCodeChange}
                            />
                        </div>
                        <div className={"text-sm"}>
                            {timer > 0 ? `Код отправлен, повторить через ${timer} секунд` : <button className={"underline decoration-1 decoration-transparent underline-offset-2 transition-all hover:decoration-slate-950"} onClick={(e) => handleResendCode(e)}>Отправить код еще раз</button>}
                        </div>
                    </>
                ) : (
                    <button
                        className={"bg-transparent border-slate-950 border-2 border-opacity-70 rounded-xl h-10 hover:bg-slate-900 hover:text-emerald-50 transition-all"}
                        onClick={handleSendCode}
                    >
                        Подтвердить номер
                    </button>
                )}

                {codeSent && (
                    <>
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
                            Изменить пароль
                        </button>
                    </>
                )}
            </form>
        </>
    );
};

export default RegisterInputs;