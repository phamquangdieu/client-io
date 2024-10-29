'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { delay } from '../utils'
import styles from './styles.module.css'

interface Data {
    id: number,
    name: string;
    description: string;
}

interface Props {
    data: Data
}

const Detail = ({ data }: Props) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async function () {
            console.log(123, new Date());
            await delay(3000)
            setLoading(false)
        console.log(1234, new Date());
        })()
    }, [])
    return (
        <div className={styles.test123}> 
            <Suspense fallback={<div>Loading....</div>}>
            {loading ? 'loading' : data.name}
            </Suspense>
        </div>
    );
}
 
export default Detail;