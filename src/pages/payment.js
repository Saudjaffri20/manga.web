import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const CheckoutForm = ({ clientSecret, productId }) => {
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
            setSubscription('John Doe', productId);
        }

    };

    const setSubscription = async (name, productId) => {
        const obj = {
            userId: Cookies.get('user_id'),
            productId, productId
        }
        const res = await axios.post(`/api/subscription`, obj);
        if (!res.data.error) {
            setLoading(false);
            setPaymentSuccess(true);
            setTimeout(() => {
                router.push('/');
                setPaymentSuccess(false);
            }, 1500);
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

    const createPaymentIntent = async (id) => {
        // const res = await axios.post(`/api/stripe_checkout`, {amount: 2000 });
        const res = await axios.post(`/api/stripe_checkout`, { productId: id });
        const { clientSecret } = await res.data;
        setClientSecret(clientSecret);
    };

    useEffect(() => {
        if (query.id && query.id != undefined) {
            createPaymentIntent(query.id);
        }
    }, [query]);

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} productId={query.id} />
                </Elements>
            )}
        </div>
    );
};

export default Payment;