import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie'

const ProtectedRoutes = ({ children }) => {

    const router = useRouter();
    const token = Cookies.get('token');

    console.log(token)

    useEffect(() => {
        if (!token) {
            router.replace('/');
        }
    }, [token]);

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoutes;
