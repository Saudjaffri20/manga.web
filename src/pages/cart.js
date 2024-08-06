import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { removeCartListToLocalStorage, getCartListToLocalStorage } from "@/utils/token";
import Cookies from 'js-cookie'
import Loader from '@/components/Loader';
import ProtectedRoutes from '@/components/ProtectedRoutes';

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
        const cartList = removeCartListToLocalStorage(productId);
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
                                    <LiaTimesSolid size={20} color='white' className="red-color cursor-pointer" onClick={() => cancel(item.productId)} />
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
    const [discountCode, setDiscountCode] = useState("");
    const [error, setError] = useState({ msg: '', error: false, success: false });
    const [discountAmount, setDiscountAmount] = useState(null);
    const [cartError, setCartError] = useState({ msg: '', error: false });

    const proceedToCheckout = async () => {
        try {
            setLoader(true)
            const products = getCartListToLocalStorage();
            const amount = discountAmount ? discountAmount : totalAmount
            const obj = {
                userId: Cookies.get('user_id'),
                totalAmount: Number(amount),
                products: products,
                isCouponCodeApplied: discountAmount ? true : false
            }
            if (products.length > 0) {
                const res = await axios.post(`/api/checkout`, obj);
                if (!res.data.error) {
                    router.push(`/payment?id=${res.data.id}`)
                }
            } else {
                setCartError({ msg: 'Your Cart is Empty!', error: true })
            }
            setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    const applyDiscountCode = async () => {
        if ('MPWELCOME20' === discountCode) {
            const discount = totalAmount - (totalAmount * 0.20);
            const res = await axios.get(`/api/coupon?userId=${Cookies.get('user_id')}`);
            if (!res.data.error) {
                if (!res.data.data.isCouponUser) {
                    setDiscountAmount(discount);
                    setError({ msg: 'Code Applied', error: false, success: true })
                } else {
                    setError({ msg: 'You Already Use Code', error: true, success: false })
                }
            }
        } else {
            setError({ msg: 'Code Invlid', error: true, success: false })
        }
    }

    return (
        <ProtectedRoutes>
            <div className="flex py-8">
                <div className="flex-grow">
                    <div className="flex items-start">
                        <div className="relative z-0 group me-4">
                            <input type='text' onChange={(e) => setDiscountCode(e.target.value)} autoComplete="off" id="discountCode" name="discountCode" value={discountCode || ""} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " required />
                            <label htmlFor="discountCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discount Code</label>
                            {error.error && <span class="flex items-center tracking-wide text-red-500 text-xs mt-2">{error.msg}</span>}
                            {error.success && <span class="flex items-center tracking-wide text-green-500 text-xs mt-2">{error.msg}</span>}
                        </div>
                        <button onClick={applyDiscountCode} className="px-4 py-2 bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition">Apply coupon</button>
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
                            <span className="font-semibold">Discount</span>
                            <span>${discountAmount != null ? discountAmount : 0}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-300">
                            <span className="font-semibold">Total</span>
                            <span>${discountAmount != null ? discountAmount : totalAmount}</span>
                        </div>
                        <button className="bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition w-full" onClick={proceedToCheckout}>
                            {
                                loader ? <Loader /> : 'Proceed to checkout'
                            }
                        </button>
                        {cartError.error && <span class="flex items-center justify-center tracking-wide text-red-500 text-xs mt-2">{cartError.msg}</span>}
                    </div>
                </div>

            </div>
        </ProtectedRoutes>
    );
};


export default Cart;
