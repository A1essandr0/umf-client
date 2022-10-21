import React, { useState } from 'react';

import UrlGenerator from './UrlGenerator';
import QrPresenter from './QrPresenter';
import RecordsTable from './RecordsTable';

export function App() {
    let [QRImage, setQRImage] = useState("QR");

    function generateQR(text) {
        console.log(`generating QR for ${text}`);
        setQRImage("generated QR");
    }

    return (
        <div className='appContainer'>
            <div className='upperContainer'>

                <div className='linksBox'>
                    <UrlGenerator generateQR={generateQR} />
                </div>

                <div className='qrBox'>
                    <QrPresenter QRImage={QRImage}/>
                </div>
            </div>

            <div className='lowerContainer'>
                <RecordsTable />
            </div>
        </div>
    )
}