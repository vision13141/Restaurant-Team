import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { errorMessage, successMessage } from "../Toast/toast";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const handleLogin = (el) => {
        el.preventDefault();
        if (!email) {
            alert("Please enter email");
        } else if (!password) {
            alert("Please enter password");
        } else {
            const auth = getAuth();
            setloading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    successMessage("User log in successfully", "top-center");
                    navigate("/");
                    setloading(false);
                })
                .catch(() => {
                    errorMessage("Invalid Credential", "top-left", "dark");
                });
        }
    };
    return (
        <div className="h-[60vh] mt-[10vh] bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
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
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        className="w-full bg-btn text-white py-2 rounded-full"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;