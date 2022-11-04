import React, { useEffect, useState } from 'react';

import { getRecords } from '../code/requestApi';
import { server_url, client_url, config } from "../code/config";

import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider'


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
        <div className='recordsContainer'>
            <div className='linksHeader'>your last links</div>
            
            {records && records.Records && records.Records.map(
                (item, reactKey) => { return (
                    <div className='recordRow' key={reactKey}>
                        <span className='recordCell'>
                            <Link href={`${client_url}/${item.Shorturl }`}>{`${client_url}/${item.Shorturl}`}</Link>
                        </span>
                        <span className='recordCell'>
                            {item.CreatedAt.slice(0, 16)}
                        </span>
                        <div className='recordCell'>{item.Longurl}</div>
                        <Divider />
                    </div>
                )}
            )}
        </div>
    )
}

