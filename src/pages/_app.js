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

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
