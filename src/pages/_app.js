// pages/_app.js
import Layout from '../components/Layout';
import Head from "next/head";
import '../styles/globals.css';
import Modal from 'react-modal';
import { useEffect } from 'react';



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    useEffect(() => {
        setTimeout(() => {
            Modal.setAppElement('#__next');
        }, 1000);
    }, [])

    useEffect(() => {
        // Facebook Pixel initialization
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e); t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', '795226059459270');
        fbq('track', 'PageView');
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq) return; 
                n=f.fbq=function() {
                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '795226059459270');
              fbq('track', 'PageView');
            `,
                    }}
                />

                <noscript>
                    <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=795226059459270&ev=PageView&noscript=1" />
                </noscript>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
