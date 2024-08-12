"use client";
import module from '../cart.module.css';

import React from "react";

interface BtncounterProps {
    id: string;
    quantity: number;
    updateQuantity: (newQuantity: number) => void;
}

const Btncounter = ({ quantity, updateQuantity }: BtncounterProps) => {
    return (
        <></>
    );
};

export default Btncounter;