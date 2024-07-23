// pages/404.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home page after 2 seconds
        const redirectTimer = setTimeout(() => {
            router.push('/');
        }, 2000);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div className="container">
            <h1>Page Not Found</h1>
            <p>Redirecting you to the home page...</p>
            <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
          text-align: center;
        }
      `}</style>
        </div>
    );
}
