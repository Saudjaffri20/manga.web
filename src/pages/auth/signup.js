import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { validateEmail } from '@/utils/validation';


const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({ msg: '', error: false });

    const handleChange = (event) => {
        setError({ msg: '', error: false })
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateEmail(formData.email) && formData.password) {
                const obj = {
                    "first_name": formData.first_name | "",
                    "last_name": formData.last_name | "",
                    "email": formData.email,
                    "password": formData.password
                }
                const response = await axios.post('/api/users', obj)
                if (response) {
                    router.push('/auth/login')
                }
            } else {
                setError({ msg: 'Please fill all Required Fields!', error: true })
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div class="container mx-auto pt-20">
            <div className='w-full pb-10 pt-2 m-auto' style={{ maxWidth: '500px' }}>
                <div className='flex justify-between mb-10'>
                    <h2 className="text-2xl font-bold dark:text-white">Sign Up</h2>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit} className='w-full'>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="first_name" name="first_name" value={formData.first_name || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="last_name" name="last_name" value={formData.last_name || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='email' autoComplete="off" id="email" name="email" value={formData.email || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address*</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type='password' autoComplete="new-password" id="password" name="password" value={formData.password || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password*</label>
                    </div>
                    {error.error && <span class="flex items-center tracking-wide text-red-500 text-xs mt-1 ml-1">{error.msg}</span>}
                    <div className='text-center my-8 mt-10'>
                        <button type="submit" className="general-fill-btn px-6 py-3" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm text-gray-200 mb-0'>Do you have an Account? <span type='button' className='link' onClick={() => router.push('/auth/login')}>Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup