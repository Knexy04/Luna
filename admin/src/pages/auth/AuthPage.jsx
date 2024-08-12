import module from "./auth.module.scss"
import {useContext, useEffect, useState} from "react";
import {authService} from "../../services/auth.service.js";
import ErrorPopup from "../../components/popups/ErrorPopup.jsx";
import {redirect, useNavigate} from "react-router-dom";

const AuthPage = () => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleInputPhone = (event) => {
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

    const handleSubmit = async (event) => {
        try {
            setError(null)
            event.preventDefault()
            const response = await authService.login({phoneNumber: phone, password})

            localStorage.setItem('token', response.token);


            navigate('/')
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    useEffect(() => {
        if (error !== null) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await authService.getUser();
            } catch (e) {
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
    }, [navigate]);



    return (
        <>
            {error && <ErrorPopup message={error}/>}

            <div className={module.page}>
                <form onSubmit={handleSubmit} className={module.authBlock}>
                    <section className={module.inputBlock}>
                        <label htmlFor={"phone"}>Номер телефона</label>
                        <input id={"phone"} type={"tel"} value={phone} onChange={handleInputPhone}/>
                    </section>
                    <section className={module.inputBlock}>
                        <label htmlFor={"password"}>Пароль</label>
                        <input id={"password"} type={"password"} value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </section>
                    <button className={error && module.error} type={"submit"} disabled={!phone || !password}>Войти</button>
                </form>
            </div>
        </>

    )
}

export default AuthPage