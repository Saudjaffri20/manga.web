// pages/dashboard.js

import axios from 'axios';
import { useEffect } from 'react';
import ProtectedRoutes from '../../components/ProtectedRoutes';

const Info = () => {

    useEffect(() => {
        getDataByApi()
    }, [])


    const getDataByApi = async (e) => {
        try {
            const response = await axios.get('/api/article')
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>Welcome</div>
    );
}

export default Info;