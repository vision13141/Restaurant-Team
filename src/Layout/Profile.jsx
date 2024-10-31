import { MdOutlineLogin } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { errorMessage, successMessage } from "../Toast/toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
    const navigate = useNavigate();

    // Get current user
    const auth = getAuth();

    const user = auth?.currentUser;


    const [obj, setobj] = useState({
        name: "",
        img: ""
    })


    const date = new Date();

    // Log out
    const HandleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
                successMessage("Logged out", "top-center", "dark");
            })
            .catch((error) => {
                errorMessage(error.message);
            });
    };

    useEffect(() => {
        setobj((prev) => ({ ...prev, name: user?.displayName.split(",")[0], img: user?.displayName.split(",")[1] }))
    }, [obj])


    return (
        <div className="py-[100px] mt-[15vh]">
            <div className="container">
                <div className="flex items-start justify-between border-b-2 pb-4">
                    <h5 className="font-montserrat text-4xl font-medium capitalize">
                        Welcome, {obj.name}
                        <h5 className="text-lg font-montserrat font-normal text-prh2 pt-2">
                            {date?.toLocaleDateString()}
                        </h5>
                    </h5>
                    <button
                        onClick={HandleLogout}
                        className="bg-btn flex items-center gap-x-2 text-white rounded-3xl py-3 px-5 font-montserrat font-normal capitalize text-base"
                    >
                        Log out <MdOutlineLogin className="text-2xl" />
                    </button>
                </div>
                <div className="flex items-center gap-x-3 pt-16">
                    <div className="bg-red-600 size-[80px] rounded-full">
                        <img src={obj.img} alt="" className="w-full h-full rounded-full" />
                    </div>
                    <div>
                        <h5 className="font-montserrat font-bold text-xl capitalize text-prh2">
                            Alexa Rawles
                        </h5>
                        <p className="font-montserrat font-semibold text-prh capitalize text-base">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="pt-14 flex items-start max-w-[500px] flex-col gap-y-10">
                    <div className="w-full">
                        <label className="font-montserrat font-medium text-prh2 text-xl">
                            Full name
                        </label>
                        <p className="bg-red-400 rounded-md p-2 w-full text-white font-montserrat text-base capitalize">
                            {obj.name}
                        </p>
                    </div>
                    <div className="w-full">
                        <label className="font-montserrat font-medium text-prh2 text-xl">
                            Uid
                        </label>
                        <p className="bg-red-400 rounded-md w-full p-2 text-white font-montserrat text-base capitalize">
                            {user?.uid}
                        </p>
                    </div>
                    <div className="w-full">
                        <label className="font-montserrat font-medium text-prh2 text-xl">
                            Phone number
                        </label>
                        <p className="bg-red-400 rounded-md w-full p-2 text-white font-montserrat text-base capitalize">
                            Alexa Rawles
                        </p>
                    </div>
                    <div className="w-full">
                        <label className="font-montserrat font-medium text-prh2 text-xl">
                            Address
                        </label>
                        <p className="bg-red-400 rounded-md w-full p-2 text-white font-montserrat text-base capitalize">
                            Alexa Rawles
                        </p>
                    </div>
                    <div className="w-full">
                        <label className="font-montserrat font-medium text-prh2 text-xl">
                            Country
                        </label>
                        <p className="bg-red-400 rounded-md w-full p-2 text-white font-montserrat text-base capitalize">
                            Alexa Rawles
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;