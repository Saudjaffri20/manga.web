import Image from 'next/image'
import React from 'react'

const NovelsListingCard = ({ item, buyNow }) => {
    return (
        <div className='card relative article-card'>
            <span className='absolute top-[20px] left-[-10px] bg-[#54595f] text-[16px] text-[#fff] rounded-full h-[48px] w-[48px] flex items-center justify-center'>New</span>
            <div>
                <Image
                    src={'/images/' + item?.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    style={{
                        width: "100%"
                    }}
                />
            </div>
            <div className='bg-white p-4'>
                {
                    item.realaseTag && <h6 className='text-[#7a7a7a] text-[14px] mb-0'>{item.realaseTag}</h6>
                }
                <h5 className='text-[#cc2e33] text-[16px] font-medium'>{item.title}</h5>
                <h5 className='text-[#000] text-[18px] font-medium my-2'>${item.price}</h5>
                <h6 className='text-[#7a7a7a] text-[14px] mb-0'>Author: {item.author}</h6>
                <p className='text-[#7a7a7a] text-[14px] my-6'>Description: {item.description}</p>
                <button href={'#'} className="general-fill-btn py-3 px-10" onClick={(event) => buyNow(event, item)}>{item.isPaid ? 'Read More' : item.isInCart ? 'View Cart' : 'Add to Cart'}</button>
            </div>
        </div>
    )
}

export default NovelsListingCard