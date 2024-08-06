import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Cookies from 'js-cookie'
import { getToken } from '@/utils/token';
import Image from 'next/image';

const Info = () => {

    const router = useRouter();
    const [latestArticle, setLatestArticle] = useState([]);

    useEffect(() => {
        getDataByApi(14);
    }, [])

    const getDataByApi = async (offset) => {
        try {
            const id = Cookies.get('user_id')
            let subscription = await axios.get(`/api/subscription?userId=${id}`)
            let response = await axios.get(`/api/article?offset=${Number(offset)}`);
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

    const readEbook = (event, item) => {
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
                                        <div className='card relative article-card cursor-pointer' key={index} onClick={(event) => readEbook(event, item)}>
                                            <div className='border'>
                                                <Image
                                                    src={'/images/' + item?.thumbnail}
                                                    alt={item.title}
                                                    width={450}
                                                    height={600}
                                                    style={{
                                                        width: "100%"
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-start justify-end opacity-0 hover:opacity-100 transition-opacity duration-300 p-3">
                                                <h5 className='text-[#fff] text-[20px] font-medium'>{item.title}</h5>
                                            </div>
                                        </div>
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
