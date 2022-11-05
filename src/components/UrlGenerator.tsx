import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { createLinkServerRequest } from '../code/requestApi';
import { client_url } from "../code/config";


function UrlGenerator(props) {
    let [isLinkGenerated, setIsLinkGenerated] = useState(false);

    let [urlText, setUrlText] = useState("");
    let [aliasText, setAliasText] = useState("");
    let [shortLinkText, setShortLinkText] = useState("");
    let [errorText, setErrorText] = useState("");


    function checkLink(link) {
        // TODO check last link for repetition

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
                props.generateQR(resultingUrl);
                props.triggerRecordsReload();
            } else {
                setErrorText(`something went wrong: ${data}`);
            }
        }).catch(err => setErrorText(`something went wrong: ${err}`));
    }


    return (
        <div className='urlGenerator'>
            <Card elevation={15}>
                <div className='textField'>
                    <TextField id='enterLinkField' variant='standard' label='Url' value={urlText} fullWidth
                        onChange={(event) => setUrlText(event.target.value)}
                        className="urlTextField"
                    />
                </div>

                <div className='textField'>
                    <TextField id='enterLinkAliasField' variant='standard' label='alias' value={aliasText}
                        className='textFieldWidth'
                        onChange={(event) => setAliasText(event.target.value)} 
                    />

                    <div className='alignedButton'>
                        <Button variant='contained' size='small'
                            onClick={generateLink}
                        >Shorten me</Button>
                    </div>

                    <div className='alignedButton'>
                        <Button variant='outlined' size='small'
                            onClick={()=> {
                                setUrlText("");
                                setAliasText("");
                                setShortLinkText("");
                                setIsLinkGenerated(false);
                            }}
                        >Clear</Button>
                    </div>
                </div>
                
                <div className='notVisibleTextField' id='errorText'>{errorText}</div>

                <div>
                    <div className='textField'>
                        <TextField id='resultingShortLink' size='small' className='shortenedLink textFieldWidth' variant='standard'
                            value={shortLinkText} disabled={!isLinkGenerated}
                        />

                        <div className='alignedButtonClipboard'>
                            <Button variant='outlined' size='small' disabled={!isLinkGenerated}
                                onClick={() => { navigator.clipboard.writeText(shortLinkText) }}
                            >Copy to clipboard</Button>
                        </div>
                    </div>
                </div>           
            </Card>
        </div>
    );
}

export default UrlGenerator;