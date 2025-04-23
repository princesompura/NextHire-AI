import React from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'

function Interview() {
    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                    className='w-[140px]' />
                    <h2 className='mt-3'>AI-Powered Interview Plateform</h2>
            </div>
        </div>
    )
}

export default Interview