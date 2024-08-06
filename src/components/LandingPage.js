import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import NovelsListingCard from './NovelsListingCard'
import SignUpModal from './SignUpModal'
import LoginModal from './LoginModal'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getToken, setCartListToLocalStorage, getCartListToLocalStorage } from '@/utils/token'
import Loader from './Loader'

const getStarted = [
    {
        label: 'The Impact of Manga on Pop Culture How Manga Has Influenced Fashion, Film, Literature, Technology, and More',
        url: 'https://mangapointer.com/the-impact-of-manga-on-pop-culture-how-manga-has-influenced-fashion-film-literature-technology-and-more/',
    },
    {
        label: 'Manga Culture Around the World The Global Influence of Manga and Its Adaptations',
        url: 'https://mangapointer.com/manga-culture-around-the-world-the-global-influence-of-manga-and-its-adaptations/',
    },
    {
        label: 'Exploring the Most Iconic Manga Genres An Overview of Popular Manga Genres with Essential Reads (IMHO)',
        url: 'https://mangapointer.com/exploring-the-most-iconic-manga-genres-an-overview-of-popular-manga-genres-with-essential-reads-imho/',
    },
    {
        label: 'Classic Manga Series Everyone Should Read Timeless Manga That Have Left a Lasting Impact on the Genre',
        url: 'https://mangapointer.com/classic-manga-series-everyone-should-read-timeless-manga-that-have-left-a-lasting-impact-on-the-genre/',
    },
    {
        label: 'A Brief Summary of the Evolution of Manga Art Styles Over the Decades',
        url: 'https://mangapointer.com/a-brief-summary-of-the-evolution-of-manga-art-styles-over-the-decades/',
    },
]

const collection = [
    {
        url: '/',
        thumbnail: '1722111306462_thumbnail.webp',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        thumbnail: '1722111306462_thumbnail.webp',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        thumbnail: '1722111306462_thumbnail.webp',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
    {
        url: '/',
        thumbnail: '1722111306462_thumbnail.webp',
        title: 'Astra Lost in Space',
        price: '10.99',
        author: 'Masashi Kishimoto',
        description: 'Follow the adventures of Naruto Uzumaki, a young ninja with dreams of becoming…'
    },
]

const LandingPage = () => {

    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [latestArticle, setLatestArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getDataByApi(6);
    }, [])

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

    const buyNow = (event, item) => {
        event.preventDefault();
        const token = getToken();
        if (token) {
            if (item.isPaid) {
                router.push('/preview?filename=' + item.file + '&count=' + item.fileCount);
            } else {
                let cartList = getCartListToLocalStorage();
                if (cartList && cartList != null && cartList.length > 0) {
                    if (cartList.includes(item.productId)) {
                        router.push('/cart');
                    } else {
                        let modifiedCartList = cartList;
                        modifiedCartList.push(item.productId);
                        setCartListToLocalStorage(modifiedCartList);
                    }
                } else {
                    let modifiedCartList = [];
                    modifiedCartList.push(item.productId);
                    setCartListToLocalStorage(modifiedCartList);
                }
                getDataByApi();
            }
        } else {
            setOpenLoginModal(true);
        }
    }

    const loadMore = () => {
        setLoading(true);
        getDataByApi(14);
    }
    // Old Method
    // const getDataByApi = async (offset) => {
    //     try {
    //         const id = Cookies.get('user_id')
    //         let url = '/api/article';
    //         let subscription;
    //         if (id) {
    //             url = `/api/article?offset=${Number(6)}`;
    //             subscription = await axios.get(`/api/subscription?userId=${id}`)
    //         }
    //         const response = await axios.get(url);
    //         let cartList = getCartListToLocalStorage();
    //         if (!response.data.error) {
    //             if (response.data.data.length > 0 && subscription && subscription != undefined && !subscription.data.error) {
    //                 const data = response.data.data;
    //                 for (let index = 0; index < data.length; index++) {
    //                     if (subscription?.data?.data?.products.includes(data[index].productId)) {
    //                         data[index].isPaid = true;
    //                     } else {
    //                         data[index].isPaid = false;
    //                     }
    //                     if (cartList && cartList != null && cartList.includes(data[index].productId)) {
    //                         data[index].isInCart = true;
    //                     } else {
    //                         data[index].isInCart = false;
    //                     }
    //                 }
    //                 setLatestArticle(data);
    //             } else {
    //                 const data = response.data.data;
    //                 const token = getToken();
    //                 if (token) {
    //                     for (let index = 0; index < data.length; index++) {
    //                         if (cartList && cartList != null && cartList.length > 0 && cartList.includes(data[index].productId)) {
    //                             data[index].isInCart = true;
    //                         } else {
    //                             data[index].isInCart = false;
    //                         }
    //                     }
    //                 }
    //                 setLatestArticle(data);
    //             }
    //         } else {
    //             setLatestArticle(collection);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getDataByApi = async (offset) => {
        try {
            const response = await axios.get(`/api/article?offset=${Number(offset)}`);
            if (!response.data.error) {
                if (response.data.data.length > 0) {
                    const data = response.data.data;
                    setLatestArticle(data);
                } else {
                    const data = response.data.data;
                    setLatestArticle(data);
                }
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='page-manga-1090801'>
                <section className='home-banner px-20'>
                    <div className="grid grid-cols-1 relative h-full text-center">
                        <div className='flex flex-col justify-center items-center w-full m-auto' style={{ maxWidth: '770px' }}>
                            <h1 className='mb-4'>Discover Your Next Manga Adventure</h1>
                            <p className='leading-[1.8]'>Welcome to Manga Pointer, your ultimate destination for discovering the best manga novels and series. Whether you’re a seasoned manga enthusiast or a newcomer, we’ve got you covered with curated collections, insightful reviews, and the latest releases.</p>
                            <div className='flex gap-8 mt-12'>
                                <button onClick={() => setOpenSignUpModal(true)} className='general-fill-btn py-4 px-8' style={{ borderColor: '#fff' }} >Sign Up</button>
                                <button className='general-fill-btn on-hover py-4 px-8'>Sell Your Manga or Light Novel</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className='px-20'>
                    <section className='notice-slider'>
                        <div className='flex bg-white p-2 items-center'>
                            <label>Notice</label>
                            <marquee>
                                <strong>Stay tune for more exciting news! </strong> Don't Miss Out! Sign up for updates and our newsletters!
                            </marquee>
                        </div>
                    </section>
                    {/* <section className='offering-section py-[100px]'>
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
                    </section> */}
                </div>
                <div className='bg-[#334155] h-[1px]'></div>
                <section className='px-20 py-10'>
                    <div className='grid grid-cols-4'>
                        <div className='border border-[#334155] p-4 mr-10'>
                            <div className=''>
                                <h5 className='text-[#000] text-[20px] font-medium mb-0 p-2 bg-white'>Recent Posts</h5>
                                <ul className='py-5'>
                                    {
                                        getStarted.map((item, index) => (
                                            <li key={index} className='flex gap-4 mb-6'>
                                                <Link target='_blank' href={item.url} className='font-light text-[15px] text-[#fff] hover:underline'>{item.label}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div className='border border-[#334155] py-2 px-5'>
                                <div className='offering-section'>
                                    <h2 className='text-center my-4'>Featured Creators</h2>
                                    <p className='text-center text-[20px] mb-[30px]'>Top Picks and Exciting New Releases</p>
                                </div>
                                <div className='bg-[#334155] h-[1px] mb-[30px]'></div>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        latestArticle.map((item, index) => (
                                            <NovelsListingCard item={item} key={index} buyNow={buyNow} />
                                        ))
                                    }
                                </div>
                                <div className='text-center my-[50px]' >
                                    <button className='general-fill-btn py-4 px-8 font-medium' onClick={loadMore}>
                                        {
                                            loading ? <div className='px-5'><Loader size={15} /></div> : 'Load More'
                                        }
                                    </button>
                                </div>
                                {/* <div className='bg-[#334155] h-[1px] my-20'></div>
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                <div className='bg-[#334155] h-[1px]'></div>
                <section className='offering-section py-[100px]'>
                    {/* <h2 className='text-center mb-4'>Monthly Ranking</h2>
                    <p className='text-center text-[20px] mb-[60px]'>Top Reads of the Month</p> */}
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

            <SignUpModal open={openSignUpModal} close={closeSignUpModal} openLoginModal={loginModal} />
            <LoginModal open={openLoginModal} close={closeLoginModal} openSignUpModal={signUpModal} />
        </>
    )
}

export default LandingPage