"use client"
import module from "../cart.module.css"
import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAccount, mdilMapMarker, mdilCurrencyRub, mdilBank } from '@mdi/light-js';
import { userService } from "@/app/services/user.service";

const Checkout = (props: any) => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [promo, setPromo] = useState('');
    const [promoError, setPromoError] = useState('');
    const [salePromo, setSalePromo] = useState(0);
    const [address, setAddress] = useState('');

    useEffect(() => {
        setName(props.userData.firstName);
        setLastname(props.userData.lastName);
        setCity(props.userData.city);
        setAddress(props.userData.address);
        setEmail(props.userData.email);
        setPhoneNumber(props.userData.phoneNumber);
    }, [
        props.userData.firstName,
        props.userData.lastName,
        props.userData.city,
        props.userData.address,
        props.userData.email,
        props.userData.phoneNumber
    ]);

    const [selectedOptionDelivery, setSelectedOptionDelivery] = useState<string | null>(null);
    const [selectedOptionPayment, setSelectedOptionPayment] = useState<string | null>(null);

    const handleCheckboxChangeDelivery = (optionId: string) => {
        setSelectedOptionDelivery(optionId);
    };

    const handleCheckboxChangePayment = (optionId: string) => {
        setSelectedOptionPayment(optionId);
    };

    const handleUsePromo = async () => {
        try {
            const response = await userService.usePromo(promo, props.price - props.sale);
            setPromoError(response.message);
            setSalePromo(response.sale);
        } catch (error: any) {
            setPromoError(error.response.data.message);
            setSalePromo(0);
            console.error('Произошла ошибка при использовании промокода:', error);
        }
    };

    const handleAddOrder = () => {
        try {
            userService.getUser()
                .then((res) => {
                    const response = userService.makeOrder(res.cart, props.price + (props.price - props.sale) * 0.02 - salePromo, selectedOptionPayment, selectedOptionDelivery, address);
                    const response2 = userService.updatePromo(promo);
                    window.location.href = "/profile";
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={"bg-main bg-opacity-25 flex flex-col gap-8 rounded-2xl pb-4 mt-8"}>
            <div className={"px-4 pt-4"}>
                <div className={module.step}>
                    <Icon path={mdilAccount} size={1} />
                    <div className={module.stageName}>
                        Информация клиента
                    </div>
                </div>
                <div className={"w-full flex lg:flex-row flex-col gap-8 pt-8 lg:justify-center lg:flex-wrap"}>
                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"name"}>Имя</label>
                        <input
                            placeholder="Имя"
                            id={"name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>

                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"surname"}>Фамилия</label>
                        <input
                            placeholder="Фамилия"
                            id={"surname"}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>

                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"city"}>Город</label>

                        <input
                            placeholder="Город"
                            value={city}
                            id={"city"}
                            onChange={(e) => setCity(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>

                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"address"}>Адрес</label>

                        <input
                            placeholder="Адрес"
                            id={'address'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>

                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"email"}>Email</label>

                        <input
                            placeholder="E-mail"
                            id={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>

                    <div className={"lg:w-1/3"}>
                        <label htmlFor={"phone"}>Телефон</label>

                        <input
                            placeholder="Телефон"
                            id={"phone"}
                            value={'+7' + phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={module.inputData}
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className={"p-4"}>
                <div className={module.step}>
                    <Icon path={mdilMapMarker} size={1} />
                    <p className={module.stageName}>
                        Способы доставки
                    </p>
                </div>

                <div className="mt-2 lg:px-8 text-base opacity-50 mb-5">
                    Выберите удобный способ доставки для данного заказа
                </div>
                <div className="flex flex-col lg:px-12 gap-2">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="delivery_1"
                            checked={selectedOptionDelivery === "1"}
                            onChange={() => handleCheckboxChangeDelivery("1")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="delivery_1" className="ml-2">
                            Доставка Почтой России
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="delivery_2"
                            checked={selectedOptionDelivery === "2"}
                            onChange={() => handleCheckboxChangeDelivery("2")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="delivery_2" className="ml-2">
                            Доставка СДЭК
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="delivery_3"
                            checked={selectedOptionDelivery === "3"}
                            onChange={() => handleCheckboxChangeDelivery("3")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="delivery_3" className="ml-2">
                            Доставка Яндекс.Доставка
                        </label>
                    </div>
                </div>
            </div>
            <div className={"px-4"}>
                <div className={module.step}>
                    <Icon path={mdilBank} size={1} />
                    <p className={module.stageName}>
                        Способ оплаты
                    </p>
                </div>

                <div className="mt-2 text-base text-slate-500 lg:px-8 mb-4">
                    Выберите удобный способ оплаты
                </div>
                <div className="flex flex-col gap-2 lg:px-12">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="1"
                            checked={selectedOptionPayment === "1"}
                            onChange={() => handleCheckboxChangePayment("1")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="1" className="ml-2">
                            Банковской картой онлайн
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="2"
                            checked={selectedOptionPayment === "2"}
                            onChange={() => handleCheckboxChangePayment("2")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="2" className="ml-2">
                            Наличными при получении
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="3"
                            checked={selectedOptionPayment === "3"}
                            onChange={() => handleCheckboxChangePayment("3")}
                            className="cursor-pointer"
                        />
                        <label htmlFor="3" className="ml-2">
                            Через электронный кошелек
                        </label>
                    </div>
                    <div className={`${module.promo} promo flex justify-between mt-10`}>
                        <input
                            placeholder="введите промокод"
                            value={promo}
                            onChange={(e) => setPromo(e.target.value)}
                            className={`${module.promoItem} bg-back border-b mb-4 w-4/12 border-black outline-0`}
                        />
                        {promoError}
                        <div className="">
                            <button
                                onClick={() => handleUsePromo()}
                                className={`${module.promoItem2} border border-black rounded-full py-2 px-6`}
                            >
                                применить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`px-4`}>
                <div className={module.step}>
                    <Icon path={mdilCurrencyRub} size={1} />
                    <p className={module.stageName}>
                        Сумма заказа
                    </p>
                </div>

                <div className="lg:px-12 mt-4">
                    <div className="flex flex-col gap-3 font-bold">
                        <div className="flex justify-between">
                            <div>Стоимость продуктов</div>
                            <div>{props.price - props.sale}<span className="ml-2">P</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Стоимость доставки</div>
                            <div>0<span className="ml-2">P</span></div>
                        </div>
                        {salePromo !== 0 &&
                            <div className="flex justify-between">
                                <div>Промокод</div>
                                <div>{salePromo}<span className="ml-2">P</span></div>
                            </div>
                        }
                        <div className="flex justify-between">
                            <div>Итого</div>
                            <div>{(props.price - props.sale) - salePromo}<span className="ml-2">P</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${module.buttonAccept} flex justify-around`}>
                <button onClick={props.goTPrevStep} className={module.button}>Вернуться к заказу</button>
                <button onClick={handleAddOrder} className={module.button}>Оформить заказ</button>
            </div>
        </div>
    );
}

export default Checkout;
