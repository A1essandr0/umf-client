import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { createLinkServerRequest } from '../code/requestApi';
import { client_url } from "../code/config";

const textFieldStyles = {
    marginTop: "5px",
    marginLeft: "10px",
    marginRight: "10px"
}
const alignedButtonStyles = {
    display: "inline-flex",
    marginTop: "10px",
    marginLeft: "10px",
    marginBottom: "10px"
}


function UrlGenerator(props) {
    let [isLinkGenerated, setIsLinkGenerated] = useState(false);
    let [shouldGenerateQRForLongLink, setShouldGenerateQRForLongLink] = useState(true);

    let [urlText, setUrlText] = useState("");
    let [aliasText, setAliasText] = useState("");
    let [shortLinkText, setShortLinkText] = useState("");
    let [errorText, setErrorText] = useState("");


    function checkLink(link) {
        if (link.includes('http')) return true;
        return false;
    }

    function generateLink() {
        let isLinkCorrect = checkLink(urlText);
        if (!isLinkCorrect) {
            setErrorText("We are shortening URL, yes?")
            setIsLinkGenerated(false);
            return
        }

        createLinkServerRequest(urlText, aliasText).then(data => {
            if (data.status && data.status == 409) {
                setErrorText(`alias ${aliasText} is already in use`);
                return
            }
            if (data.Link) {
                let resultingUrl = `${client_url}/${data.Link}`
                setShortLinkText(resultingUrl)
                setIsLinkGenerated(true);
                setErrorText("");

                if (shouldGenerateQRForLongLink) props.generateQR(data.OriginalUrl)
                else props.generateQR(resultingUrl);
                props.triggerRecordsReload();
            } else {
                setErrorText(`something went wrong: ${data}`);
            }
        }).catch(err => setErrorText(`something went wrong: ${err}`));
    }


    return (
        <Box sx={{ marginLeft: 15, marginTop: 10, marginRight: 10}}>
            <Card elevation={15} sx={{ borderRadius: "15px" }}>
                <Box sx={textFieldStyles}>
                    <TextField id='enterLinkField' variant='standard' label='Url' value={urlText} fullWidth
                        onChange={(event) => setUrlText(event.target.value)}
                    />
                </Box>

                <Box sx={textFieldStyles}>
                    <TextField id='enterLinkAliasField' variant='standard' label='alias' value={aliasText}
                        sx={{ width: "300px" }}
                        onChange={(event) => setAliasText(event.target.value)} 
                    />

                    <Box sx={alignedButtonStyles}>
                        <Button variant='contained' size='small'
                            onClick={generateLink}
                        >Shorten me</Button>
                    </Box>

                    <Box sx={alignedButtonStyles}>
                        <Button variant='outlined' size='small'
                            onClick={()=> {
                                setUrlText("");
                                setAliasText("");
                                setShortLinkText("");
                                setIsLinkGenerated(false);
                                setShouldGenerateQRForLongLink(true);
                            }}
                        >Clear</Button>
                    </Box>

                    <Box>
                        <Checkbox checked={shouldGenerateQRForLongLink}
                            onChange={(event) => setShouldGenerateQRForLongLink(event.target.checked)}
                        />
                        Generate QR for full link
                    </Box>
                </Box>


                <Box sx={{ ...textFieldStyles, minHeight: "25px", color: "red"}} id='errorText'>{errorText}</Box>

                <Box>
                    <Box sx={textFieldStyles}>
                        <TextField id='resultingShortLink' size='small'
                            sx={{ width: "300px", backgroundColor: "rgb(185, 220, 241)" }} variant='standard'
                            value={shortLinkText} disabled={!isLinkGenerated}
                        />

                        <Box sx={{ display: "inline-flex", marginBottom: "10px", marginLeft: "30px" }}>
                            <Button variant='outlined' size='small' disabled={!isLinkGenerated}
                                onClick={() => { navigator.clipboard.writeText(shortLinkText) }}
                            >Copy to clipboard</Button>
                        </Box>
                    </Box>
                </Box>     
            </Card>
        </Box>
    );
}

export default UrlGenerator;