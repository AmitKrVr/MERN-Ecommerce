import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products,
    } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((data) => ({ ...data, [name]: value }));
    };

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + "/api/order/verifyRazorpay",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        { headers: { token } }
                    );
                    if (data.success) {
                        toast.success(data.message);
                        if (data.message === "Payment Successful") {
                            navigate("/orders");
                            setCartItems({});
                        } else {
                            // Payment is authorized but not yet captured
                            toast.info(
                                "Your payment is being processed. Please check your orders page for updates."
                            );
                            navigate("/orders");
                        }
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(
                        "An error occurred while verifying the payment"
                    );
                }
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(
                            products.find((product) => product._id === items)
                        );
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            switch (method) {
                case "cod":
                    {
                        const response = await axios.post(
                            backendUrl + "/api/order/place",
                            orderData,
                            { headers: { token } }
                        );
                        if (response.data.success) {
                            setCartItems({});
                            navigate("/orders");
                        } else {
                            toast.error(response.data.message);
                        }
                    }
                    break;
                case "stripe":
                    {
                        const responseStripe = await axios.post(
                            backendUrl + "/api/order/stripe",
                            orderData,
                            { headers: { token } }
                        );
                        if (responseStripe.data.success) {
                            const { session_url } = responseStripe.data;
                            window.location.replace(session_url);
                        } else {
                            toast.error(responseStripe.data.message);
                        }
                    }
                    break;
                case "razorpay":
                    {
                        const responseRazorpay = await axios.post(
                            backendUrl + "/api/order/razorpay",
                            orderData,
                            { headers: { token } }
                        );
                        if (responseRazorpay.data.success) {
                            initPay(responseRazorpay.data.order);
                        }
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        name="firstName"
                        required
                        onChange={onChangeHandler}
                        value={formData.firstName}
                        placeholder="First name"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                    <input
                        type="text"
                        name="lastName"
                        required
                        onChange={onChangeHandler}
                        value={formData.lastName}
                        placeholder="Last name"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    required
                    onChange={onChangeHandler}
                    value={formData.email}
                    placeholder="Email address"
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
                <input
                    type="text"
                    name="street"
                    required
                    onChange={onChangeHandler}
                    value={formData.street}
                    placeholder="Street"
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
                <div className="flex gap-3">
                    <input
                        name="city"
                        type="text"
                        required
                        onChange={onChangeHandler}
                        value={formData.city}
                        placeholder="City"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                    <input
                        type="text"
                        name="state"
                        required
                        onChange={onChangeHandler}
                        value={formData.state}
                        placeholder="State"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        type="number"
                        name="zipcode"
                        required
                        onChange={onChangeHandler}
                        value={formData.zipcode}
                        placeholder="Zipcode"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                    <input
                        type="text"
                        name="country"
                        required
                        onChange={onChangeHandler}
                        value={formData.country}
                        placeholder="Country"
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    />
                </div>
                <input
                    type="number"
                    name="phone"
                    required
                    onChange={onChangeHandler}
                    value={formData.phone}
                    placeholder="Phone"
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                />
            </div>

            {/* Right Side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />

                    {/* Payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div
                            onClick={() => setMethod("stripe")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "stripe"
                                        ? "bg-green-400 border-green-400"
                                        : ""
                                }`}></p>
                            <img
                                src={assets.stripe_logo}
                                alt=""
                                className="h-5 mx-4"
                            />
                        </div>
                        <div
                            onClick={() => setMethod("razorpay")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "razorpay"
                                        ? "bg-green-400 border-green-400"
                                        : ""
                                }`}></p>
                            <img
                                src={assets.razorpay_logo}
                                alt=""
                                className="h-5 mx-4"
                            />
                        </div>
                        <div
                            onClick={() => setMethod("cod")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "cod"
                                        ? "bg-green-400 border-green-400"
                                        : ""
                                }`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">
                                CASH ON DELIVERY
                            </p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button
                            type="submit"
                            // onClick={() => navigate("/orders")}
                            className="bg-black text-white px-16 py-3 text-sm">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default PlaceOrder;
