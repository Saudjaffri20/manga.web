import React from 'react'
import PDFViewer from '../components/PDFViewer'
import { useRouter } from 'next/router';
import PDFSample from '../components/PDFSample';

const Preview = ({ PDF }) => {
    const router = useRouter();
    const { query } = router;

    return (
        <>
            {/* <PDFViewer data={query} /> */}
            <PDFSample pdfUrl={query} />
        </>
    )
}

export default Preview