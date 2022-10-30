import React, { useEffect, useState } from 'react';

import { getRecords } from '../code/requestApi';
import { client_url } from "../code/config";

import Link from '@mui/material/Link';


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
        getRecords().then(data => {            
            setRecords(data);
        });
    }, [props.nRecordReloads,])

    return (
        <div className='recordsContainer'>
            <div className='linksHeader'>your last links</div>
            
            {records && records.Records.map(
                (item, reactKey) => { return (
                    <div className='recordRow' key={reactKey}>
                        <Link href={`${client_url}/${item.Shorturl }`}>{`${client_url}/${item.Shorturl}`}</Link>
                        <span>&nbsp;&nbsp;&nbsp;{item.CreatedAt.slice(0, 16)}</span>
                        <br />
                        <div>{item.Longurl.slice(0,80) + '...'}</div>
                    </div>
                )}
            )}
        </div>
    )
}

