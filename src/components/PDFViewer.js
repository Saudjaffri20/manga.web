import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const width = 600;
const height = 424;

const Page = ({ pageNumber }, ref) => {
    return (
        <div ref={ref}>
            <ReactPdfPage pageNumber={pageNumber} width={width} />
        </div>
    );
};

// const Page = React.forwardRef(({ pageNumber }, ref) => {
//     return (
//         <div ref={ref}>
//             <ReactPdfPage pageNumber={pageNumber} width={width} />
//         </div>
//     );
// });

function PDFViewer({ data }) {
    const [numberOfPages, setNumberOfPages] = useState([]);

    useEffect(() => {
        let array = [];
        for (let index = 0; index < data.count; index++) {
            array.push(index + 1);
        }
        setNumberOfPages(array)
    }, [data])




    return (
        <div className="">
            <Document file={"/images/" + data.filename}>
                <HTMLFlipBook width={width} height={height}>
                    {numberOfPages.map((item, index) => <Page key={index} pageNumber={item} />)}
                </HTMLFlipBook>
            </Document>
        </div>
    );
}

export default PDFViewer;
