import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

const ProtectedRoutes = ({ children }) => {

    const router = useRouter();
    const token = Cookies.get('token');

    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        if (!token) {
            setIsVerified(false);
            router.replace('/');
        } else {
            setIsVerified(true);
        }
    }, [token]);

    return (
        <div>
            {setIsVerified ? children : "loading"}
        </div>
    );
};

export default ProtectedRoutes;
