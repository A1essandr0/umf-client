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
            setErrorText("we are in link shortening business, mate")
            setIsLinkGenerated(false);
            return
        }

        createLinkServerRequest(urlText, aliasText).then(data => {
            if (data.Link) {
                let resultingUrl = `${client_url}/${data.Link}`
                setShortLinkText(resultingUrl)
                setIsLinkGenerated(true);
                props.generateQR(resultingUrl);
                props.triggerRecordsReload();
            } else {
                setErrorText(`something went wrong: ${data}`);
            }
        }).catch(err => setErrorText(`something went wrong: ${err}`));
    }


    return (
        <div className='urlGenerator'>
            <Card elevation={5}>
                <TextField id='enterLinkField' variant='standard' label='Url' value={urlText} fullWidth
                    onChange={(event) => setUrlText(event.target.value)}
                />
                <br />

                <TextField id='enterLinkAliasField' variant='standard' label='alias' value={aliasText}
                    onChange={(event) => setAliasText(event.target.value)} />

                <Button variant='contained' size='small'
                    onClick={generateLink}
                >Shorten me</Button>
                
                <Button variant='outlined' size='small'
                    onClick={()=> {
                        setUrlText("");
                        setAliasText("");
                        setShortLinkText("");
                        setIsLinkGenerated(false);
                    }}
                >Clear</Button>

                <br />
                <span id='errorText'>{errorText}</span>
                <br />

                <TextField id='resultingShortLink' size='small' className='shortenedLink' variant='standard'
                    value={shortLinkText} disabled={!isLinkGenerated}
                />
                <Button variant='outlined' size='small' disabled={!isLinkGenerated}
                    onClick={() => { navigator.clipboard.writeText(shortLinkText) }}
                >Copy to clipboard</Button>

            </Card>
        </div>
    );
}

export default UrlGenerator;