import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import Context from "../Context/Context";
import { data } from "autoprefixer";
import Review from "./AboutPage/Review";

const CustomerReviewForm = () => {

    const { revFnc } = useContext(Context)

    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");


    const handleImageFileChange = (e) => {
        const file = e.target.files[0];

        setImagePreview(URL.createObjectURL(file));

        if (file) {
            const imagepath = URL.createObjectURL(file);
            console.log(imagepath);

            setImageUrl(imagepath);
        }

    };

    const handleRemoveImage = () => {
        setImageUrl("");
        setImagePreview("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !review || !rating || !date || !imageUrl) {
            const newReview = {
                name,
                review,
                rating: parseInt(rating),
                date: new Date().toLocaleDateString(),
                imageUrl: imageUrl,
            };

            revFnc(newReview)

            setName("");
            setReview("");
            setRating(5);
            setImageUrl("");
            setImagePreview("");

        } else {
            alert("Fil all field")
        }

    };


    return (
        <div className="mt-[8vw]">

            <div className="">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg mb-6">
                    <h2 className="text-2xl font-montserrat font-semibold text-center  mb-4">Submit Your Review</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border-2 border-btn rounded-full px-3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-prh2 font-montserrat font-semibold mb-2">Review</label>
                        <input
                            type="text"
                            placeholder="Enter your review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border-2 border-btn rounded-full px-3"
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-x-2">
                        <label className="block text-gray-700 font-semibold mt-2 mb-2">Rating:</label>
                        <div className="flex">
                            {Array(5)
                                .fill("")
                                .map((el, index) => {
                                    return (
                                        < FaStar
                                            key={index}
                                            onClick={() => setRating(index + 1)}
                                            className={`w-4 h-4 flex mx-1 cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                                        />
                                    )
                                })}
                        </div>
                    </div>


                    {/* File Upload Input */}
                    <div className="mb-4">
                        <label className="block text-prh2 font-montserrat font-semibold mb-2">Upload Image</label>
                        <input
                            type="file"
                            onChange={handleImageFileChange}
                            className="w-full p-2 border-2 font-montserrat border-btn rounded-lg px-3"
                            accept="image/*"
                            disabled={imageUrl !== ""}
                        />
                    </div>

                    {/* Image Preview and Remove Button */}
                    {imagePreview && (
                        <div className="mb-4 text-center">
                            <label className="block text-gray-700 font-semibold mb-2">Image Preview</label>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="bg-btn text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                                Remove Image
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-btn font-montserrat text-white px-4 py-2 rounded-full  "
                    >
                        Submit Review
                    </button>
                </form>
            </div>

            <div className="">
                <Review />
            </div>
        </div>
    );
};

export default CustomerReviewForm;