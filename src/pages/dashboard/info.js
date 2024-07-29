import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import NovelsListingCard from '../../components/NovelsListingCard';
import { useRouter } from 'next/router';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Cookies from 'js-cookie'
import { getToken } from '@/utils/token';

const Info = () => {

    const router = useRouter();
    const [latestArticle, setLatestArticle] = useState([]);

    useEffect(() => {
        getDataByApi();
    }, [])

    const getDataByApi = async (e) => {
        try {
            const id = Cookies.get('user_id')
            let subscription = await axios.get(`/api/subscription?userId=${id}`)
            let response = await axios.get(`/api/article?userId=${id}`)
            if (!response.data.error) {
                if (response.data.data.length > 0 && subscription && subscription != undefined && !subscription.data.error) {
                    const data = response.data.data;
                    const array = []
                    for (let index = 0; index < data.length; index++) {
                        if (subscription?.data?.data?.products.includes(data[index].productId)) {
                            data[index].isPaid = true;
                            array.push(data[index])
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

    const buyNow = (event, item) => {
        event.preventDefault();
        const token = getToken();
        if (token) {
            router.push('/preview?filename=' + item.file + '&count=' + item.fileCount);
        }
    }

    return (
        <ProtectedRoutes>
            <section className='px-20 py-10'>
                <div className='offering-section'>
                    <h2 className='text-center my-4 mb-20'>My Collections</h2>
                </div>
                {
                    latestArticle.length === 0 ? (
                        <div className='flex justify-center items-center h-full'>
                            <p className='text-lg text-gray-600'>No purchased articles found.</p>
                        </div>
                    ) :
                        (
                            <div className='grid grid-cols-4 gap-5'>
                                {
                                    latestArticle.map((item, index) => (
                                        <NovelsListingCard item={item} key={index} buyNow={buyNow} />
                                    ))
                                }
                            </div>
                        )
                }

            </section>
        </ProtectedRoutes>
    );
}

export default Info;
