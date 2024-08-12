"use client";

import { useEffect } from "react";
import Link from "next/link";
import LoginInputs from "./loginputs";

const AuthPage = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token !== null && token !== '') {
                window.location.href = '/profile';
            }
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="bg-main mt-[-64px] sm:mt-[0px] md:w-5/12 rounded-xl p-4 flex flex-col gap-4">
                <article className="text-lg text-center p-2 border-b-2 border-slate-950 border-opacity-70">Авторизация</article>
                <LoginInputs />
                <div className="flex justify-between gap-12">
                    <Link className="underline text-sm decoration-transparent hover:decoration-black transition-all underline-offset-2" href="/register">Регистрация</Link>
                    <Link className="underline text-sm decoration-transparent hover:decoration-black transition-all underline-offset-2" href="/reloadpassword">Забыли пароль?</Link>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
