// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className='main-wrapper'>
            <Header/>
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    );
}
