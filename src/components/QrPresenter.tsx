import React from 'react';

import QRCode from 'react-qr-code';
import Card from '@mui/material/Card';


function QrPresenter(props) {
    return (
        <div className='qrPresenter'>
            <Card variant='outlined' square>
                {props.QRValue && <QRCode value={props.QRValue} level='H'/>}
            </Card>
        </div>
    );
}

export default QrPresenter;