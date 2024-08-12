"use client"
import Checkout from './checkout';
import FirstStep from "./firststep";
import { useState } from "react"

const Steps = ({ userData, price, sale, cartItems, setCartItems, doc }) => {
    const [step, setStep] = useState(1);

    const goToNextStep = () => {
        setStep(step + 1);
    };
    const goTPrevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className={'lg:px-24'}>
            {step === 1 ? (
                <FirstStep

                    price={price}
                    sale={sale}
                    goToNextStep={goToNextStep}
                    doc={doc}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                />
            ) : (
                <Checkout
                    userData={userData}
                    price={price}
                    sale={sale}
                    doc={doc}
                    goTPrevStep={goTPrevStep}
                />
            )}
        </div>
    );
}

export default Steps;
