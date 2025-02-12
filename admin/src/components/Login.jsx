import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + "/api/user/admin", {
                email,
                password,
            });

            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md border">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </p>
                        <input
                            required
                            type="email"
                            value={email}
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border  border-gray-300 outline-none"
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Password
                        </p>
                        <input
                            required
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md w-full px-3 py-2 border  border-gray-300 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
