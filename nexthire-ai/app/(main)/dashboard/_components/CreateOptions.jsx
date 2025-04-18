import { Phone, PhoneCallIcon, Video } from 'lucide-react'
import React from 'react'

function CreateOptions() {
    return (
        <div className='grid grid-cols-2 gap-5'>
            <div className='bg-blue-50 p-5 rounded-lg w-full shadow-lg'>
                <Video className='p-3 text-primary bg-blue-200 rounded-lg h-12 w-12' />
                <h2 className='font-bold mt-2'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI Interview and Schedule then with Candidates</p>
            </div>
            <div className='bg-blue-50 p-5 rounded-lg w-full shadow-lg'>
                <PhoneCallIcon className='p-3 text-primary bg-blue-200 rounded-lg h-12 w-12' />
                <h2 className='font-bold mt-2'>Create Phone Screening Call</h2>
                <p className='text-gray-500'>Schedule Phone Screening Call Candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions
