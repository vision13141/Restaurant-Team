import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({ src, name }) => {
    return (
        <div className="relative max-w-[380px] shadow-md rounded-tl-[40px] rounded-br-[40px] bg-white pb-10 pt-16 flex text-center flex-col items-center px-4">
            {/* customer img */}
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-50 bg-red-300 w-[100px] h-[100px] rounded-full">
                <img
                    src={src}
                    alt={"customerImg"}
                    className="w-full h-full rounded-full"
                />
            </div>
            {/* star */}
            <div className="flex items-center justify-center mt-5 gap-x-2 text-yellow-500 text-xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
                <FaRegStar />
            </div>
            <p className="pt-8 pb-5 font-montserrat font-normal text-base text-prh max-w-[380px] leading-6">
                Lorem ipsum dolor sit amet consectetur. Tortor massa nisl
                quam sit. Vitae congue ultrices neque penatibus mi in
                quisque. Leo in cursus enim magnis ante. Proin iaculis
                platea ipsum sagittis ac eu aliquam quis. Ornare tincidunt
                tempus semper{" "}
            </p>
            {/* Name & designation */}
            <div>
                <h3 className="font-montserrat font-bold text-base text-prh2">
                    {name}
                </h3>
                <h5 className="font-montserrat font-normal text-sm text-prh">
                    CEO & Founder Inc{" "}
                </h5>
            </div>
        </div>
    )
}

export default ReviewCard