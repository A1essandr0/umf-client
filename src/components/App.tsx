import React, { useState } from 'react';

import UrlGenerator from './UrlGenerator';
import QrPresenter from './QrPresenter';
import RecordsTable from './RecordsTable';

export function App() {
    let [QRImage, setQRImage] = useState("QR");
    let [nRecordReloads, setNRecordReloads] = useState(0)

    function generateQR(text) {
        setQRImage(`generated QR for ${text}`);
    }

    function triggerRecordsReload() {
        setNRecordReloads(nRecordReloads+1);
    }

    return (
        <div className='appContainer'>
            <div className='upperContainer'>

                <div className='linksBox'>
                    <UrlGenerator 
                        generateQR={generateQR} 
                        triggerRecordsReload={triggerRecordsReload}
                    />
                </div>

                <div className='qrBox'>
                    <QrPresenter QRImage={QRImage}/>
                </div>
            </div>

            <div className='lowerContainer'>
                <RecordsTable nRecordReloads={nRecordReloads} />
            </div>
        </div>
    )
}