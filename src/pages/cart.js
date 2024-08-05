import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { removeCartListToLocalStorage, getCartListToLocalStorage } from "@/utils/token";
import Cookies from 'js-cookie'
import Loader from '../components/Loader';

const Cart = () => {

    const router = useRouter();
    const [latestArticle, setLatestArticle] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        getDataByApi();
    }, [])

    const getDataByApi = async (e) => {
        try {
            let response = await axios.get(`/api/article`)
            if (!response.data.error) {
                if (response.data.data.length > 0) {
                    const data = response.data.data;
                    let cartList = getCartListToLocalStorage();
                    const array = [];
                    let price = 0;
                    setTotalAmount(0);
                    for (let index = 0; index < data.length; index++) {
                        if (cartList && cartList != null && cartList.includes(data[index].productId)) {
                            array.push(data[index]);
                            price = data[index].price + price;
                            setTotalAmount(price);
                        }
                    }
                    setLatestArticle(array);
                } else {
                    setLatestArticle([]);
                }
            } else {
                setLatestArticle([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancel = (productId) => {
        const cartList = removeCartListToLocalStorage();
        const data = latestArticle;
        const array = [];
        let price = 0;
        for (let index = 0; index < data.length; index++) {
            if (cartList.includes(data[index].productId)) {
                array.push(data[index]);
                price = data[index].price + price;
                setTotalAmount(price);
            }
        }
        setLatestArticle(array);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Cart</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="w-1/6 px-4 py-2 text-left border">Product</th>
                        <th className="w-2/6 px-4 py-2 text-left border">Price</th>
                        <th className="w-1/6 px-4 py-2 text-left border">Quantity</th>
                        <th className="w-1/6 px-4 py-2 text-left border">Subtotal</th>
                        <th className="w-1/6 px-4 py-2 text-left border"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        latestArticle && latestArticle.length > 0 && latestArticle.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    <img src={'/images/' + item?.thumbnail} alt="Product" className="w-10 h-10 object-cover" />
                                    <span>{item.title}</span>
                                </td>
                                <td className="border px-4 py-2">${item.price}</td>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">${item.price}</td>
                                <td className="border px-4 py-2 text-center">
                                    <LiaTimesSolid size={20} color='white' className="red-color" onClick={() => cancel(item.productId)} />
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

            <CartTotals totalAmount={totalAmount} />

        </div>
    );
};


const CartTotals = ({ totalAmount }) => {
    const router = useRouter();

    const [loader, setLoader] = useState(false);
    const proceedToCheckout = async () => {
        try {
            setLoader(true)
            const products = getCartListToLocalStorage();
            const obj = {
                userId: Cookies.get('user_id'),
                totalAmount: Number(totalAmount),
                products: products
            }
            const res = await axios.post(`/api/checkout`, obj);
            if (!res.data.error) {
                setLoader(false)
                router.push(`/payment`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex py-8">
            <div className="flex-grow">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        className="border px-4 py-2 w-1/3 mr-4"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white">Apply coupon</button>
                </div>
            </div>
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-6">Cart totals</h1>
                <div className="border border-gray-300 p-4 rounded-md">
                    <div className="flex justify-between py-2">
                        <span className="font-semibold">Subtotal</span>
                        <span>${totalAmount}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-300">
                        <span className="font-semibold">Shipping</span>
                        <div>
                            <p className="text-green-500">Free shipping</p>
                            <p>Shipping to <span className="font-semibold">NY</span>.</p>
                            <a href="#" className="text-blue-500">Change address</a>
                        </div>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-300">
                        <span className="font-semibold">Total</span>
                        <span>${totalAmount}</span>
                    </div>
                    <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md" onClick={proceedToCheckout}>
                        {
                            loader ? <Loader /> : 'Proceed to checkout'
                        }
                    </button>
                </div>
            </div>

        </div>
    );
};


export default Cart;
