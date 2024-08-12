"use client"
import module from './profile.module.css';
import ChangePassword from "@/app/profile/changePassword";
import PersonalInfo from "@/app/profile/personalInfo";
import Orders from "@/app/profile/orders";
import ButtonExit from './buttonExit';
import { useState, useEffect } from 'react';
import Loading from "../loading";
import { useGlobalContext } from "@/app/context/store";

const Profile = () => {
    const { userData } = useGlobalContext();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token === null || token === '') {
                window.location.href = "/auth";
            } else {
                setIsAuthorized(true);
            }
        }
    }, []);

    if (!isAuthorized) {
        return <Loading />;
    }

    if (!userData._id) {
        return <Loading />;
    }

    return (
        <div className={`${module.page}`}>
            <div className="flex flex-col gap-8">
                <label className='text-2xl font-bold'>Личный кабинет</label>

                {userData && <Orders data={userData} />}

                <PersonalInfo userData={userData} />

                <ChangePassword />

                <ButtonExit />
            </div>
        </div>
    );
};

export default Profile;
