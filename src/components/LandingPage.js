import React, { useEffect, useState } from 'react'
import Placeholder from '@/assets/img/placeholder.png'
import Abc from '@/assets/img/abc.webp'
import Xyz from '@/assets/img/xyz.webp'
import Image from 'next/image'
import Link from 'next/link'
import NovelsListingCard from './NovelsListingCard'
import SignUpModal from './SignUpModal'

const offeringCard = [
    {
        placeholder: Placeholder,
        label: 'Find Your Favourites',
        desp: 'Discover our wide range of manga collections, including various genres and themes.',
    },
    {
        placeholder: Placeholder,
        label: 'Find Your Favourites',
        desp: 'Discover our wide range of manga collections, including various genres and themes.',
    },
    {
        placeholder: Placeholder,
        label: 'Find Your Favourites',
        desp: 'Discover our wide range of manga collections, including various genres and themes.',
    },
    {
        placeholder: Placeholder,
        label: 'Find Your Favourites',
        desp: 'Discover our wide range of manga collections, including various genres and themes.',
    },
]

const getStarted = [
    {
        label: 'About MP',
        url: '/collection',
    },
    {
        label: 'Reedem Coupons',
        url: '/collection',
    },
    {
        label: 'Reedem Gifted eBooks',
        url: '/collection',
    },
    {
        label: 'FAQ',
        url: '/collection',
    },
    {
        label: 'Point Affiliate Program',
        url: '/collection',
    },
]

const collection = [
    {
        url: '/',
        placeholder: Abc,
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Abc,
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Abc,
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Abc,
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
]

const newRelease = [
    {
        url: '/',
        placeholder: Xyz,
        realaseTag: 'New Realse',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Xyz,
        realaseTag: 'New Realse',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Xyz,
        realaseTag: 'New Realse',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        placeholder: Xyz,
        realaseTag: 'New Realse',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
]


const LandingPage = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className='page-manga-1090801'>
                <section className='home-banner px-20'>
                    <div className="grid grid-cols-2 relative h-full">
                        <div className='flex flex-col justify-center'>
                            <h1 className='mb-4'>Discover Your Next Manga Adventure</h1>
                            <p className='leading-[1.8]'>Welcome to Manga Pointer, your ultimate destination for discovering the best manga novels and series. Whether you’re a seasoned manga enthusiast or a newcomer, we’ve got you covered with curated collections, insightful reviews, and the latest releases.</p>
                            <div className='flex gap-8 mt-12'>
                                <button className='general-fill-btn py-4 px-8' >Start Exploring Now</button>
                                <button className='general-fill-btn on-hover py-4 px-8' onClick={openModal}>Browse Collection</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='px-20'>
                    <section className='notice-slider'>
                        <div className='flex bg-white p-2 items-center'>
                            <label>Notice</label>
                            <marquee>
                                <strong>Kinnikuman&apos;s 45th Anniversary:</strong> The beloved manga series Kinnikuman is celebrating its 45th anniversary with a special exhibition in Tokyo. Fans can look forward to a unique 45th-anniversary figure capturing Kinnikuman in his iconic pose  |
                                <strong>Elden Ring Comedy Manga:</strong> A new comedy manga based on the popular video game Elden Ring is set to release. This manga will focus on the game&apos;s NPCs, offering fans a humorous take on the characters they&apos;ve come to know through lore videos  | <strong>The Essential Manga Guide:</strong> Crunchyroll&apos;s senior features editor, Briana Lawrence, has authored &apos;The Essential Manga Guide: 50 Series Every Manga Fan Should Know.&apos; This guide serves as a comprehensive primer on manga for both long-time enthusiasts and newcomers
                            </marquee>
                        </div>
                    </section>
                    <section className='offering-section py-[100px]'>
                        <h2 className='text-center mb-4'>Discover Our Offerings</h2>
                        <p className='text-center text-[20px] mb-[60px]'>Join Our Community of Manga Lovers</p>
                        <div className="grid grid-cols-4 gap-5">
                            {
                                offeringCard.map((item, index) => (
                                    <div key={index} className='offering-card'>
                                        <Link href="/">
                                            <Image
                                                src={item.placeholder}
                                                alt={item.label}
                                                height="100%"
                                                width="100%"
                                            />
                                            <h3 className='text-[22px] my-3 underline underline-offset-4'>{item.label}</h3>
                                            <p className='text-[#D1D5DB] text-[16px]'>{item.desp}</p>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='text-center mt-[80px]' >
                            <button className='general-fill-btn py-5 px-12 font-medium'>Get Started</button>
                        </div>
                    </section>
                </div>
                <div className='bg-[#334155] h-[1px]'></div>
                <section className='px-20 py-10'>
                    <div className='grid grid-cols-4'>
                        <div className='border border-[#334155] p-2 mr-10'>
                            <div className='border border-[#dddddd]'>
                                <h5 className='text-[#000] text-[20px] font-medium mb-0 p-2 bg-white'>Get Started</h5>
                                <ul className='px-9 py-12'>
                                    {
                                        getStarted.map((item, index) => (
                                            <li key={index} className='flex gap-4 mb-6'>
                                                <Link href={item.url} className='underline text-[16px] text-[#fff] hover:text-[#fa7a46]'>{item.label}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div className='border border-[#334155] p-2'>
                                <div className='offering-section'>
                                    <h2 className='text-center my-4'>Collections of the Month</h2>
                                    <p className='text-center text-[20px] mb-[60px]'>Top Picks and Exciting New Releases</p>
                                </div>
                                <div className='grid grid-cols-4 gap-5'>
                                    {
                                        collection.map((item, index) => (
                                            <NovelsListingCard item={item} key={index} />
                                        ))
                                    }
                                </div>
                                <div className='bg-[#334155] h-[1px] my-20'></div>
                                <div className='offering-section'>
                                    <h2 className='text-center my-4'>New Releases</h2>
                                    <p className='text-center text-[20px] mb-[60px]'>Discover the Latest Must-Read Manga Novels</p>
                                </div>
                                <div className='grid grid-cols-4 gap-5'>
                                    {
                                        newRelease.map((item, index) => (
                                            <NovelsListingCard item={item} key={index} />
                                        ))
                                    }
                                </div>
                                <div className='text-center my-[50px]' >
                                    <button className='general-border-btn py-5 px-12 font-medium'>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='bg-[#334155] h-[1px]'></div>
                <section className='offering-section py-[100px]'>
                    <h2 className='text-center mb-4'>Monthly Ranking</h2>
                    <p className='text-center text-[20px] mb-[60px]'>Top Reads of the Month</p>
                    <div className='sub-heading mb-[50px]'>
                        <h4 className='text-center mb-4'>Subscribe</h4>
                        <p className='text-center text-[16px] text-[#7a7a7a] mb-0'>Stay up-to-date with the latest manga news, releases, and updates straight to your inbox. </p>
                    </div>
                    <div className='flex items-center justify-center m-auto gap-5 my-[20px] subscribe-section' style={{ maxWidth: '650px' }}>
                        <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email address" required />
                        <button className='general-fill-btn py-3 px-5 font-medium shrink-0'>Subscribe Now</button>
                    </div>
                    <p className='text-center text-[14px] text-[#7a7a7a] mb-[60px]'>By subscribing to our newsletter, you agree to our Terms and Conditions.</p>
                </section>
            </div>

            <SignUpModal open={modalIsOpen} close={closeModal} />
        </>
    )
}

export default LandingPage