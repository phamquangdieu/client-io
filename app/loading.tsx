import { Spin } from 'antd';
import React from 'react'

const Loading = () => {
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <Spin spinning />
        </div>
    );
}
 
export default Loading;