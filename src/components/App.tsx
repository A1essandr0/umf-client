import React, { useState } from 'react';

import UrlGenerator from './UrlGenerator';
import QrPresenter from './QrPresenter';
import RecordsTable from './RecordsTable';

export function App() {
    let [QRValue, setQRValue] = useState("");
    let [nRecordReloads, setNRecordReloads] = useState(0);

    return (
        <div className='appContainer'>
            <div className='upperContainer'>

                <div className='linksBox'>
                    <UrlGenerator 
                        generateQR={setQRValue} 
                        triggerRecordsReload={() => setNRecordReloads(n => n+1)}
                    />
                </div>

                <div className='qrBox'>
                    <QrPresenter QRValue={QRValue}/>
                </div>
            </div>

            <div className='lowerContainer'>
                <RecordsTable nRecordReloads={nRecordReloads} />
            </div>
        </div>
    )
}