import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the workerSrc to the imported worker
GlobalWorkerOptions.workerSrc = pdfWorker;


const PDFSample = ({ pdfUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            downloadPlugin: {
                downloadEnabled: false,
            },
        },
    });

    return (
        <div
            style={{
                height: '750px',
                width: '100%',
            }}
        >
            <Worker workerUrl={pdfWorker}>
                <Viewer
                    fileUrl={'/images/' + pdfUrl.filename}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PDFSample;