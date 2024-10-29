import { map } from 'lodash'
import React from 'react'

interface Props {
    id: number,
    name: string;
    description: string;
}

export async function generateStaticParams() {
    const res = await fetch('https://5f362ed35b91f60016ca5654.mockapi.io/products')
    const data = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return map(data, (item :Props) => ({id: item.id}))
  }

  const getData = async (params : {id: string}) => {
    const res = await fetch(`https://5f362ed35b91f60016ca5654.mockapi.io/products/${params.id}`, { next: { revalidate: 10}})  
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json();
}
const DetailCategory = async ({ params }: { params: {id: string}}) => {
    const data = await getData(params);
    
    return (
        <div>
            {data.name}
        </div>
    );
}
 
export default DetailCategory;