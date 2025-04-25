import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
    return (
        <div className='p-4 shadow-md bg-white'>
            <Image src={'/logo.png'} alt='logo' width={200} height={100} 
            className='w-[140px]' priority />
        </div>
    )
}

export default InterviewHeader