import React from 'react'
import PDFViewer from '../components/PDFViewer'
import { useRouter } from 'next/router';

const Preview = ({ PDF }) => {
    const router = useRouter();
    const { query } = router;

    return (
        <>
            <PDFViewer data={query} />
        </>
    )
}

export default Preview