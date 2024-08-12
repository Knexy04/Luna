"use client"
import Icon from "@mdi/react";
import { mdilAlertCircle, mdilCheck } from "@mdi/light-js";
import module from "@/app/profile/profile.module.css";
import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { UserDataType } from "@/app/dataTypes/Interfaces";

interface PersonalInfoProps {
    userData: UserDataType;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userData }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [changed, setChanged] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        email: "",
        phoneNumber: "",
    });
    const [errorUpdate, setErrorUpdate] = useState('');

    useEffect(() => {
        setData(userData);
    }, [userData]);

    useEffect(() => {
        setName(data.firstName);
        setSurname(data.lastName);
        setCity(data.city);
        setAddress(data.address);
        setEmail(data.email);
        setPhone("+7" + data.phoneNumber);
    }, [data]);

    useEffect(() => {
        if (name !== data.firstName || surname !== data.lastName || city !== data.city || address !== data.address || email !== data.email || phone !== '+7' + data.phoneNumber) {
            setChanged(true);
        } else {
            setChanged(false);
        }
    }, [name, surname, city, address, email, phone, data]);

    const handleInputPhone = (event: any) => {
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

    const handleSaveChangeUserInfo = async () => {
        try {
            const response = await userService.updateUser({ firstName: name, phoneNumber: phone, lastName: surname, city: city, address: address, email: email });
            setChanged(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    return (
        <section className={'border-2 rounded-2xl border-main pb-8'}>
            <div className=" flex justify-between bg-main p-8 rounded-t-2xl">
                <div className="flex items-center gap-4">
                    <Icon path={mdilAlertCircle} size={1.2} />
                    <p>Основные данные</p>
                </div>
                <div className={module.stageName}>
                    <button disabled={!changed} onClick={handleSaveChangeUserInfo}
                        className={'p-2 disabled:opacity-50 items-center transition-all hover:bg-opacity-70 flex gap-2 md:gap-4 bg-back rounded-xl font-medium'}>
                        Сохранить
                        <Icon path={mdilCheck} size={1} />
                    </button>
                </div>
            </div>
            <div className={`${module.infoProfile} flex pt-6 px-8`}>
                <div className={`w-full flex lg:flex-row flex-col gap-4 lg:justify-around lg:flex-wrap`}>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={module.label}>Имя</p>
                        <input
                            placeholder="Имя"
                            id={"name"}
                            className={`${module.inputData}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={module.label}>Фамилия</p>
                        <input
                            placeholder="Фамилия"
                            id={"surname"}
                            className={`${module.inputData}`}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={module.label}>Город</p>
                        <input
                            placeholder="Город"
                            id={"city"}
                            className={`${module.inputData}`}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={module.label}>Адрес</p>
                        <input
                            placeholder="Адрес"
                            id={"address"}
                            className={`${module.inputData}`}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={module.label}>E-mail</p>
                        <input
                            placeholder="E-mail"
                            id={"email"}
                            type={"email"}
                            className={`${module.inputData}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end px-[10%] mt-[16px]">
                {errorUpdate}
            </div>
        </section>
    )
}

export default PersonalInfo;
