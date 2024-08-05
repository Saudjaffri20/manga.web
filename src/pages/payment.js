import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import { removeALLCartToLocalStorage } from '@/utils/token';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const CheckoutForm = ({ clientSecret, productList }) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: Cookies.get('user_name'),
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSubscription('John Doe', productList);
        }

    };

    const setSubscription = async (name, productList) => {
        const obj = {
            userId: Cookies.get('user_id'),
            products: productList
        }
        const res = await axios.post(`/api/subscription`, obj);
        if (!res.data.error) {
            setLoading(false);
            setPaymentSuccess(true);
            removeALLCartToLocalStorage();
            setTimeout(() => {
                router.push('/');
                setPaymentSuccess(false);
            }, 1000);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-lg mt-20">
            <h1 className='mb-5'>Custom Payment Form</h1>
            <div className="mb-4 bg-white">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': {
                                    color: '#a0aec0',
                                },
                            },
                            invalid: {
                                color: '#fa755a',
                                iconColor: '#fa755a',
                            },
                        },
                    }}
                    className="p-2 border rounded-lg"
                />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={!stripe || loading}
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div>{error}</div>}
            {paymentSuccess && <div>Payment successful!</div>}
        </form>
    );
};

const Payment = () => {
    const router = useRouter();
    const { query } = router;
    const [clientSecret, setClientSecret] = useState('');
    const [productList, setProductList] = useState('');

    const createPaymentIntent = async (amount) => {
        // const res = await axios.post(`/api/stripe_checkout`, { amount: amount });
        const res = await axios.post(`/api/stripe_checkout`, { userId: Cookies.get('user_id'), });
        if (!res.data.error) {
            const { clientSecret, data } = await res.data;
            setClientSecret(clientSecret);
            setProductList(data);
        }
    };

    useEffect(() => {
        createPaymentIntent();
    }, []);

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} productList={productList} />
                </Elements>
            )}
        </div>
    );
};

export default Payment;