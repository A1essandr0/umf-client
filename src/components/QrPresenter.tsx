import React from 'react';

import Card from '@mui/material/Card';

function QrPresenter(props) {

    return (
        <div className='qrPresenter'>
            <Card variant='outlined' square>
                {props.QRImage}
            </Card>
        </div>
    );
}

export default QrPresenter;