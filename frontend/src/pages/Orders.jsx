import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);

    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(
                backendUrl + "/api/order/userorders",
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item["status"] = order.status;
                        item["payment"] = order.payment;
                        item["paymentMethod"] = order.paymentMethod;
                        item["date"] = order.date;

                        allOrdersItem.push(item);
                    });
                });

                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>
            <div className="">
                {orderData.map((item, index) => (
                    // flex flex-col md:flex-row md:items-center md:justify-between
                    <div
                        key={index}
                        className="py-4 border-t border-b to-gray-700 grid grid-flow-row md:grid-flow-col md:grid-cols-5 gap-4">
                        <div className="flex items-start col-span-3 gap-6 text-sm">
                            <img
                                src={item.image[0]}
                                alt=""
                                className="w-16 sm:w-20"
                            />
                            <div>
                                <p className="sm:text-base font-medium">
                                    {item.name}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                                    <p>
                                        {currency}
                                        {item.price}
                                    </p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className="mt-1">
                                    Date:{" "}
                                    <span className="text-gray-400">
                                        {new Date(
                                            item.date
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className="mt-1">
                                    Payment:{" "}
                                    <span className="text-gray-400">
                                        {item.paymentMethod}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2">
                                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                <p className="text-sm md:text-base">
                                    {item.status}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center ">
                            <button
                                onClick={loadOrderData}
                                className="border px-4 py-2 text-sm font-medium rounded-md">
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Orders;
