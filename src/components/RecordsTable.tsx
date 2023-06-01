import React, { useEffect, useState } from 'react';

import { getRecords } from '../code/requestApi';
import { server_url, client_url, config } from "../code/config";

import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box';


type RecordsResponse = null | {
    Count: number
    IP: string
    Records: Record[]
}
type Record = {
    Longurl: string
    Shorturl: string
    CreatedAt: string
}

const recordCellStyles = { marginRight: "20px"};


export default function RecordsTable(props) {
    let [records, setRecords] = useState<RecordsResponse>(null);

    useEffect(() => {
        console.log(`mode: ${config.mode}`)
        console.log(`using server url: ${server_url}`);
        console.log(`using client url: ${client_url}`);
    }, [])

    useEffect(() => {
        getRecords().then(data => {
            setRecords(data);
        });
    }, [props.nRecordReloads,])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", 
            backgroundColor: "white", borderRadius: "15px", 
            marginLeft: 15, marginRight: 15, marginTop: 1
        }}>
            <Box sx={{ textAlign: "right", 
                marginRight: "55%", marginBottom: "20px", 
                fontSize: "x-large"}}
            >your last links</Box>
            
            {records && records.Records && records.Records.map(
                (item, reactKey) => { return (
                    <Box sx={{ m: "8px", maxWidth: "1200px", 
                        textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"
                    }} key={reactKey}>
                        <span className='recordCell'>
                            <Link href={`${client_url}/${item.Shorturl }`}>{`${client_url}/${item.Shorturl}`}</Link>
                        </span>
                        <span className='recordCell'>
                            {item.CreatedAt.slice(0, 16)}
                        </span>
                        <Box>{item.Longurl}</Box>
                        <Divider />
                    </Box>
                )}
            )}
        </Box>
    )
}

