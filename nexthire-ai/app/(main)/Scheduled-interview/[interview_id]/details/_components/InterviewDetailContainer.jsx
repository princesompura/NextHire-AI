import { Clock } from 'lucide-react'
import React from 'react'

function InterviewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-blue-50 rounded-lg mt-5'>
        <h2>{interviewDetail?.jobPosition}</h2>

        <div className='mt-4'>
            <div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-sm font-bold items-center gap-3'><Clock className='h-4 w-4' />{interviewDetail?.interviewDuration}</h2>
            </div>

            <div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-sm font-bold items-center gap-3'><Clock className='h-4 w-4' />{interviewDetail?.interviewDuration}</h2>
            </div>

            <div>
                <h2 className='text-sm text-gray-500'>Duration</h2>
                <h2 className='flex text-sm font-bold items-center gap-3'><Clock className='h-4 w-4' />{interviewDetail?.interviewDuration}</h2>
            </div>
            
        </div>
    </div>
  )
}

export default InterviewDetailContainer