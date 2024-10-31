import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../Sdk/sdk";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { successMessage, errorMessage } from '../Toast/toast'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [imageUrl, setImageUrl] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordShow, setconfirmPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);



    const handleImageFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imagepath = URL.createObjectURL(file);
            setImageUrl(imagepath);
        }
    };

    const handleSignup = (el) => {
        el.preventDefault();
        if (!name) {
            errorMessage("Name is required", "top-center");
        } else if (!email) {
            errorMessage("Email is required", "top-center");
        } else if (!password) {
            errorMessage("Password is required", "top-center");
        } else if (confirmPassword !== password) {
            errorMessage("Password not match", "top-center");
        } else {
            const auth = getAuth();
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const localId = userCredential?.user.reloadUserInfo.localId

                    updateProfile(userCredential?.user, {
                        displayName: `${name},${imageUrl}`,
                    })


                    set(ref(db, "user" + localId), {
                        username: name,
                        email: email,
                        password: password,
                        photoURL: imageUrl
                    });



                    navigate("/login");
                    setLoading(false);
                    successMessage("User created successfully", "top-right", "dark");
                })
                .catch((error) => {
                    errorMessage(error.message, "top-center");
                });
        }
    };

    return (
        <div className="h-[60vh] mt-[20vh] mb-[3vw] bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-center">
                    Sign Up
                </h2>
                <form onSubmit={handleSignup}>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="Name"
                            className="w-full px-4 font-montserrat py-2 border-2 border-btn rounded-full"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(el) => setName(el.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full font-montserrat px-4 py-2 border border-btn rounded-full"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(el) => setEmail(el.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full font-montserrat px-4 py-2 border border-btn rounded-full"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(el) => setPassword(el.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={`${confirmPasswordShow ? "text" : "password"}`}
                                className="w-full font-montserrat px-4 py-2 border border-btn rounded-full"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(el) => setConfirmPassword(el.target.value)}
                            />
                            <div
                                onClick={() => setconfirmPasswordShow(!confirmPasswordShow)}
                                className="absolute cursor-pointer top-[50%] -translate-y-[50%] right-5"
                            >
                                {confirmPasswordShow ? (
                                    <FaRegEyeSlash className="text-btn text-2xl" />
                                ) : (
                                    <FaRegEye className="text-btn text-2xl" />
                                )}
                            </div>
                        </div>
                    </div>


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

                    <button
                        type="submit"
                        className="w-full font-montserrat bg-btn text-white py-2 rounded-full "
                    >
                        {loading ? "Loading..." : " Sign Up"}
                    </button>

                </form>

                <p className="mt-4 font-montserrat text-sm text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;