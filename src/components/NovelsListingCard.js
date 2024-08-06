import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'

const NovelsListingCard = ({ item, buyNow }) => {
    const router = useRouter();

    return (


        <div className='card relative article-card cursor-pointer' onClick={() => router.push(`/catalog/${item.title}`)}>
            {/* <span className='absolute top-[20px] left-[-10px] bg-[#54595f] text-[16px] text-[#fff] rounded-full h-[48px] w-[48px] flex items-center justify-center'>New</span> */}
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
                <h5 className='text-[#fff] text-[18px] font-medium my-2'>Price : ${item.price}</h5>
            </div>
            <div className='p-0'>

                {/* {
                    item.realaseTag && <h6 className='text-[#7a7a7a] text-[14px] mb-0'>{item.realaseTag}</h6>
                } */}
                {/* <h5 className='text-[#fff] text-[20px] font-medium'>{item.title}</h5>
                <h5 className='text-[#fff] text-[18px] font-medium my-2'>Price : ${item.price}</h5> */}
                {/*<h6 className='text-[#7a7a7a] text-[14px] mb-0'>Author: {item.author}</h6>
                <p className='text-[#7a7a7a] text-[14px] my-6'>Description: {item.description}</p>
                <button href={'#'} className="general-fill-btn py-3 px-10" onClick={(event) => buyNow(event, item)}>{item.isPaid ? 'Read More' : item.isInCart ? 'View Cart' : 'Add to Cart'}</button> */}
            </div>
        </div>
    )
}

export default NovelsListingCard