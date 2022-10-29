import React, { useEffect, useState } from 'react';

import { getRecords } from '../code/requestApi';
import { client_url } from "../code/config";


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
        <div>
            {records && records.Records.map(
                (item, reactKey) => { return (
                    <div key={reactKey}>
                        <span>{`${client_url}/${item.Shorturl}`}</span>
                        <span>&nbsp;&nbsp;&nbsp;{item.CreatedAt}</span>
                    </div>
                )}
            )}
        </div>
    )
}

