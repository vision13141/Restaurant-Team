import React from "react";
import { Link } from "react-router-dom";
import Button from "../Component/Button";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-[7vw] mb-[2vw]">
            <span className="font-sans font-medium text-8xl text-btn">404</span>
            <p className="text-black font-sans font-normal text-3xl">
                Page not found
            </p>
            <Link to={"/"}>
                <Button text={'Back to home'} className="bg-blue mt-6 text-white !font-medium !bg-btn font-sans !py-2 !px-4" />
            </Link>
        </div>
    );
};

export default Error;
