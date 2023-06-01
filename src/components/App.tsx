import React, { useState } from 'react';

import Box from '@mui/material/Box';

import UrlGenerator from './UrlGenerator';
import QrPresenter from './QrPresenter';
import RecordsTable from './RecordsTable';

export function App() {
    let [QRValue, setQRValue] = useState("");
    let [nRecordReloads, setNRecordReloads] = useState(0);

    return (
        <Box sx={{ display: "grid", gridTemplateRows: "450px 1fr", m: 1}}>
            <Box sx={{ gridRow: 1, display: "grid" }}>

                <Box sx={{ gridColumn: 1 }}>
                    <UrlGenerator 
                        generateQR={setQRValue} 
                        triggerRecordsReload={() => setNRecordReloads(n => n+1)}
                    />
                </Box>

                <Box sx={{ gridColumn: 2 }}>
                    <QrPresenter QRValue={QRValue}/>
                </Box>
            </Box>

            <Box sx={{ gridRow: 2 }}> 
                <RecordsTable nRecordReloads={nRecordReloads} />
            </Box>
        </Box>
    )
}