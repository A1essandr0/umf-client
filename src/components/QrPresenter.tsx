import React from 'react';

import QRCode from 'react-qr-code';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';


function QrPresenter(props) {
    
    function onImageDownLoad() {
        const svg = document.getElementById("qrCodeId");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "QRCode";
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;        
    }

    return (
        <div className='qrPresenter'>
            <Card variant='outlined' className='qrCard' square>
                {props.QRValue && 
                    <QRCode id='qrCodeId' className='qrImage' value={props.QRValue} level='H'/>}
                {!props.QRValue && <h1 className='qrText'>your QR here</h1>}
            </Card>
            {props.QRValue && <Button onClick={onImageDownLoad}>Download</Button>}
        </div>
    );
}

export default QrPresenter;