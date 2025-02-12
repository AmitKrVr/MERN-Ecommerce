import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems,
    } = useContext(ShopContext);

    const logout = async () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between py-5 font-medium">
            <Link to="/">
                <img src={assets.logo} alt="logo" className="w-36 " />
            </Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p className="transition-all  hover:scale-105">HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/collection"
                    className="flex flex-col items-center gap-1">
                    <p className="transition-all  hover:scale-105">
                        COLLECTION
                    </p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/about"
                    className="flex flex-col items-center gap-1">
                    <p className="transition-all  hover:scale-105">ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink
                    to="/contact"
                    className="flex flex-col items-center gap-1">
                    <p className="transition-all  hover:scale-105">CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                <img
                    src={assets.search_icon}
                    onClick={() => setShowSearch(true)}
                    alt=""
                    className="w-5 cursor-pointer transition-all  hover:scale-125"
                />

                <div className="group relative">
                    {/* <Link to={"/login"}> */}
                    <img
                        onClick={() => (token ? null : navigate("/login"))}
                        src={assets.profile_icon}
                        alt=""
                        className="w-5 cursor-pointer transition-all hover:scale-125"
                    />
                    {/* </Link> */}
                    {token && (
                        <div className="group-hover:block hidden absolute dropdown-menu -right-2 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-2 px-5 bg-slate-100 text-gray-500 rounded-md">
                                <p className="cursor-pointer hover:text-black">
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("/orders")}
                                    className="cursor-pointer hover:text-black">
                                    Orders
                                </p>
                                <p
                                    onClick={logout}
                                    className="cursor-pointer hover:text-black">
                                    Logout
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <Link
                    to="/cart"
                    className="relative transition-all hover:scale-110">
                    <img
                        src={assets.cart_icon}
                        alt=""
                        className="w-5 min-w-5"
                    />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartCount()}
                    </p>
                </Link>

                <img
                    src={assets.menu_icon}
                    alt=""
                    onClick={() => setVisible(true)}
                    className="w-5 cursor-pointer sm:hidden"
                />
            </div>

            {/* Sidebar menu for Mobile/small screen */}
            <div
                className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 ${
                    visible ? "w-full" : "w-0"
                }`}>
                <div className="flex flex-col text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-3 cursor-pointer">
                        <img
                            src={assets.dropdown_icon}
                            alt=""
                            className="h-4 rotate-180"
                        />
                        <p>Back</p>
                    </div>
                    <NavLink
                        to="/"
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border">
                        Home
                    </NavLink>
                    <NavLink
                        to="/collection"
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border">
                        COLLECTION
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border">
                        ABOUT
                    </NavLink>
                    <NavLink
                        to="/contact"
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border">
                        CONTACT
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
