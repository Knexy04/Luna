"use client"
import module from "@/app/profile/profile.module.css";
import Icon from "@mdi/react";
import {mdilPencil} from "@mdi/light-js";
import React, {useState} from "react";
import { mdilChevronDown } from '@mdi/light-js';
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";

const ChangePassword = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [oldPassword, setOldPass] = useState("")
    const [password, setNewPass] = useState("")
    const [verify, setVerify] = useState("")
    const [errorPassword, setError] = useState("")

    const handleChangePassword = async () => {
        try {
    
            const response = await authService.updatePassword({oldPassword, password})
    
            setError("Пароль успешно изменен!");

            setOldPass('')
            setNewPass('')
            setVerify('')

        } catch (error:any) {
            console.error('Error updating user data:', error);
            setError(error.response.data.message)
        }
    };

    return (
        <section className={`border-2 rounded-2xl mx-auto w-full lg:w-2/3 transition-all border-main isOpen ${isOpen && "pb-8"}`}>
            <button onClick={() => setIsOpen(!isOpen)}
                    className={`${!isOpen ? "overflow-hidden rounded-xl" : "rounded-t-2xl"} transition-all flex justify-between w-full bg-main p-8 items-center`}>
                <div className={`flex items-center gap-4`}>
                        <Icon path={mdilPencil} size={1.2}/>
                    <p>Смена пароля</p>
                </div>
                <Icon className={"transition-all"} path={mdilChevronDown} size={1.2} rotate={isOpen ? 180 : 0}/>
            </button>
            <div className={`${isOpen ? "h-fit opacity-100" : "opacity-0 h-0"} flex  transition-all flex-col gap-8 px-4`}>
                <div className={` ${isOpen ? "flex" : "hidden"} flex-col gap-4 px-4 items-center pt-4 w-full `}>
                    <div className={"w-full lg:w-1/2"}>
                        <p className={module.label}>Старый пароль</p>
                        <input
                            placeholder="Старый пароль"
                            id={"oldpassword"}
                            type={"password"}
                            value={oldPassword}
                            className={`${module.inputData} w-full`}
                            onChange={(e)=> {
                                setOldPass(e.target.value)
                            }}
                        />
                    </div>
                    <div className={"w-full lg:w-1/2"}>
                        <p className={module.label}>Новый пароль</p>
                        <input
                            placeholder="Пароль"
                            id={"newpassword"}
                            type={"password"}
                            value={password}
                            className={`${module.inputData} w-full`}
                            onChange={(e)=> {
                                setNewPass(e.target.value)
                            }}
                        />
                    </div>
                    <div className={"w-full lg:w-1/2"}>
                        <p className={module.label}>Подтвердите пароль</p>
                        <input
                            placeholder="Пароль"
                            id={"verifypassword"}
                            type={"password"}
                            value={verify}
                            className={`${module.inputData} w-full`}
                            onChange={(e)=> {
                                setVerify(e.target.value)
                            }}
                        />
                    </div>
                    <div className={"w-full lg:w-1/2"}>
                        <p>{errorPassword}</p>
                    </div>
                </div>
                <button disabled={!password || verify!==password} className={"p-2 bg-main w-full mx-auto disabled:opacity-50 transition-all hover:bg-opacity-70 rounded-xl "} onClick={handleChangePassword}>Обновить</button>
            </div>
        </section>
    )
}

export default ChangePassword;