// components/Header.js
import Link from 'next/link';

import Image from "next/image";
import Logo from '@/assets/img/logo.webp'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router';


const Header = () => {
    const router = useRouter();
    const logout = () => {
        // Implement logout logic here
        Cookies.remove('token')
        router.push('/')
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
                <ul className="flex navbar">
                    <li className="nav-item">
                        <Link href="/dashboard/info">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/admin/login">Admin</Link>
                    </li>
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
                    <li className="nav-item">
                        <button className='' onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;