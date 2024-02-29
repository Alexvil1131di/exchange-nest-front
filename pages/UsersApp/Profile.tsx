import useLoginForm from "@/store/singInStore";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const { getUserData } = useLoginForm();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        setUser(getUserData());
    }, []);

    return (
        <div className=" mx-auto">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
                    <p className="text-gray-500">{user?.roleText}</p>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                <div className="p-4 bg-gray-100">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => { }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;