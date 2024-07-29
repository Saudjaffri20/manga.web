import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const Login = () => {
    const [formData, setFormData] = useState({});
    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        if(formData.email === "admin@manga" && formData.password === "admin@manga2024"){
            router('/admin/manga');
            Cookies.set('admin', "logged", { expires: 1 })
        }
    }

    return (

        <div className="mt-40">
            <div style={{ width: '400px' }} className='m-auto pb-10 pt-2'>
                <div className='flex justify-between mb-10'>
                    <h2 className="text-2xl font-bold dark:text-white">Admin Login</h2>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit} className='w-full'>
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="email" name="email" value={formData.email || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" id="password" name="password" value={formData.password || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div>
                    <div className='text-left my-8 mt-4'>
                        <button type="submit" className="general-fill-btn px-6 py-3" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login