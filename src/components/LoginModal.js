import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Modal from 'react-modal';
import Cookies from 'js-cookie'
import { LiaTimesSolid } from "react-icons/lia";
import { setToken } from '../utils/token';

const LoginModal = ({ open, close, openSignUpModal }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({});
    const [error, setError] = useState({ msg: '', error: false });

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#000'
        },
    };



    const handleChange = (event) => {
        setError({ msg: '', error: false })
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.email && formData.password) {
                const obj = {
                    "email": formData.email,
                    "password": formData.password
                }
                const response = await axios.post('/api/login', obj)
                if (!response.data.error) {
                    Cookies.set('user_id', response.data.data.userId, { expires: 1 });
                    setToken(response.data.data.token);
                    close();
                    router.push('/');
                } else {
                    setError({ msg: response.data.message, error: true })
                }
            } else {
                setError({ msg: 'Please fill all Required Fields!', error: true })
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (

        <Modal
            isOpen={open}
            onRequestClose={() => close()}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div style={{ width: '700px' }} className='pb-10 pt-2'>
                <div className='flex justify-between mb-10'>
                    <h2 className="text-2xl font-bold dark:text-white">Login</h2>
                    <LiaTimesSolid size={20} color='white' onClick={close} />
                </div>
                <form autoComplete="off" onSubmit={handleSubmit} className='w-full'>
                    {/* <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="first_name" name="first_name" value={formData.first_name || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="last_name" name="last_name" value={formData.last_name || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='email' autoComplete="off" id="email" name="email" value={formData.email || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address*</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='password' autoComplete="off" id="password" name="password" value={formData.password || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password*</label>
                    </div>
                    {error.error && <span class="flex items-center tracking-wide text-red-500 text-xs mt-1 ml-1">{error.msg}</span>}
                    <div className='text-left my-8 mt-4'>
                        <button type="submit" className="general-fill-btn px-6 py-3" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm text-gray-200 mb-0'>Don't have Account? <span type='button' className='link' onClick={openSignUpModal}>Signup</span></p>
                    </div>

                </form>
            </div>
        </Modal>

    )
}

export default LoginModal