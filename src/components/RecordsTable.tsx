import React, {useEffect} from 'react';

import { getRecords } from '../code/requestApi';

export default function RecordsTable() {

    useEffect(() => {
        console.log('hello there')
    }, [])

    return (
        <div>RecordsTable</div>
    )
}

