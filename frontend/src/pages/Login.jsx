import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [currentState, setCurrentState] = useState("Sign In");
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (currentState === "Sign Up") {
                const response = await axios.post(
                    backendUrl + "/api/user/register",
                    { name, email, password }
                );
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(
                    backendUrl + "/api/user/login",
                    { email, password }
                );
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 to-gray-800">
            <div className="inline-flex items-center gap-2 mt-10 mb-2">
                <p className="ubuntu-medium text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {currentState === "Sign Up" && (
                <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-800"
                />
            )}
            <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-800"
            />
            <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-800"
            />
            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forgot your password</p>
                {currentState === "Sign In" ? (
                    <p
                        onClick={() => setCurrentState("Sign Up")}
                        className="cursor-pointer">
                        Create an account
                    </p>
                ) : (
                    <p
                        onClick={() => setCurrentState("Sign In")}
                        className="cursor-pointer">
                        Login Here
                    </p>
                )}
            </div>

            <button className="bg-black text-white px-8 py-2 mt-4 font-light">
                {currentState === "Sign In" ? "Sign In" : "Sign Up"}
            </button>
        </form>
    );
};
export default Login;
