import React, { Suspense, useEffect } from 'react'
import {Button} from 'antd'
import Detail from './Detail';
import Link from 'next/link';
import { map } from 'lodash';

interface Props {
    id: number,
    name: string;
    description: string;
}

const getData = async () => {
    const res = await fetch('https://5f362ed35b91f60016ca5654.mockapi.io/categories', { next: { revalidate: 10}})  
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json();
}



const Categories = async () => {
    const data = await getData();
   
    return (
        <Suspense fallback={<div>123231 loading</div>}>
            <div >
            123245
            </div>
            <div id="setting" >
                123
            </div>
            {map(data, (item : Props) => (
                <Link href={`/categories/${item.id}`}>{item.name}</Link>
            ))}
            <Button> 1234</Button>
        </Suspense>
    );
}
 
export default Categories;