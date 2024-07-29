// components/Header.js
import Link from 'next/link';

import Image from "next/image";
import Logo from '@/assets/img/logo.webp'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { getToken, removeToken } from '../utils/token';



const Header = () => {
    const router = useRouter();
    const token = getToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [token])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logout = (e) => {
        e.preventDefault();
        removeToken();
        Cookies.remove('user_id');
        router.push('/')
        setIsOpen(!isOpen);
    }

    return (
        <header className="header flex px-20 py-4" style={{}}>
            <div>
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="GFG logo served with static path of public directory"
                        height="90"
                        width="90"
                    />
                </Link>
            </div>
            <nav className="flex ml-auto">
                <ul className="flex items-center navbar">
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link href="/dashboard/info">Dashboard</Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link href="/">Mana</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/">Light Novels</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/">Browse</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/">News</Link>
                    </li>
                    {isAuthenticated && (
                        <li className="text-center">
                            <div className="relative flex items-center text-center">
                                <button
                                    type="button"
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    onClick={toggleDropdown}
                                >
                                    <FaRegUserCircle size={30} />
                                </button>

                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute top-[50px] right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-50 shadow shadow-[#fff]"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="py-1" role="none">
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-200 hover:text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Profile
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-200 hover:text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Settings
                                            </a>
                                            <a
                                                href="#"
                                                onClick={logout}
                                                className="block px-4 py-2 text-sm text-gray-200     hover:text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;