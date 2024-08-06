import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getToken, setCartListToLocalStorage, getCartListToLocalStorage } from '@/utils/token'

import Loader from '@/components/Loader';
import SignUpModal from '@/components/SignUpModal';
import LoginModal from '@/components/LoginModal';

const Detail = () => {
    const router = useRouter();
    const token = getToken();

    const { query } = router;
    const [catalog, setCatalogData] = useState([]);
    const [publishedDate, setPublishedDate] = useState(null);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loader, setLoader] = useState(true);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (query.slug) {
            getDataByApi(query.slug);
        }
    }, [query])


    const getDataByApi = async (slug) => {
        try {
            const id = Cookies.get('user_id')
            let response = await axios.get(`/api/article_by_slug?slug=${slug}`);
            let subscription;
            if (id) {
                subscription = await axios.get(`/api/subscription?userId=${id}`);
            }
            let cartList = getCartListToLocalStorage();
            if (!response.data.error) {
                let result = response?.data?.data
                // Format Date from Response
                var date = new Date(result.createdAt);
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-GB', options);
                // Check State
                if (cartList.length > 0 && cartList.includes(result.productId)) {
                    result.isInCart = true;
                } else {
                    result.isInCart = false;
                }
                if (subscription != undefined && !subscription.data.error && subscription.data.data.products.includes(result.productId)) {
                    result.isPaid = true;
                } else {
                    result.isPaid = false;
                }
                setCatalogData(result);
                setPublishedDate(formattedDate);
                setLoader(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = () => {

        if (token) {
            if (catalog.isPaid) {
                router.push('/preview?filename=' + catalog.file + '&count=' + catalog.fileCount);
            } else if (catalog.isInCart) {
                router.push('/cart');
            } else {
                let cartList = getCartListToLocalStorage();
                let modifiedCartList = cartList;
                modifiedCartList.push(catalog.productId);
                setCartListToLocalStorage(modifiedCartList);
                const result = catalog;
                result.isInCart = true;
                setCatalogData(result);
                setIsInCart(true);
            }
        } else {
            setOpenLoginModal(true);
        }
    }

    const closeSignUpModal = () => {
        setOpenSignUpModal(false);
    }

    const closeLoginModal = () => {
        setOpenLoginModal(false);
    }

    const loginModal = () => {
        closeSignUpModal();
        setOpenLoginModal(true);
    }

    const signUpModal = () => {
        closeLoginModal();
        setOpenSignUpModal(true);
    }

    return (

        <>
            {loader ?
                <div className='flex items-center justify-center' style={{ height: 'calc(100vh - 125px)' }}>
                    <Loader />
                </div>
                :
                <section class="text-gray-700 body-font overflow-hidden">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="lg:w-4/5 mx-auto flex flex-wrap">
                            <div>
                                <Image
                                    src={'/images/' + catalog?.thumbnail}
                                    alt={catalog.title}
                                    width={400}
                                    height={500}
                                    style={{
                                        width: "100%"
                                    }}
                                    className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                />
                            </div>
                            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col">
                                <h2 class="text-sm title-font text-gray-300 tracking-widest mb-3 mt-20">{catalog.type}</h2>
                                <h1 class="text-gray-200 text-4xl title-font font-bold mb-5">{catalog.title}</h1>
                                <h6 class="title-font font-medium text-2xl text-gray-200">${catalog.price}</h6>
                                <div class="flex flex-col my-4">
                                    <span class="title-font font-normal text-1xl text-gray-300 mb-1">{catalog.author}</span>
                                    <span class="title-font font-normal text-1xl text-gray-300">{catalog.genre}</span>
                                    <span class="title-font font-normal text-1xl text-gray-300">{publishedDate}</span>
                                </div>
                                {catalog?.description && <p class="leading-relaxed">{catalog?.description}</p>}
                                <div class="flex flex-col justify-end flex-grow items-end mt-20 pt-5">
                                    <div className='border-t border-gray-300 mt-5 p-5 w-full'></div>
                                    <button type="submit" onClick={addToCart} class="bg-gray-800 duration-200 focus:outline-none focus:shadow-outline font-medium h-12 hover:bg-gray-900 inline-flex items-center justify-center px-6 text-white tracking-wide transition w-full">
                                        {catalog.isPaid ? 'Read More' : catalog.isInCart || isInCart ? 'View Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            <SignUpModal open={openSignUpModal} close={closeSignUpModal} openLoginModal={loginModal} />
            <LoginModal open={openLoginModal} close={closeLoginModal} openSignUpModal={signUpModal} />

        </>


    )
}

export default Detail