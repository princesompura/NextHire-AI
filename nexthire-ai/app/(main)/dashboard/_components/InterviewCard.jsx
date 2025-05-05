import moment from 'moment'
import React from 'react'

function InterviewCard({ interview }) {
    return (
        <div className='p-5 bg-blue-50 rounded-lg border mt-5'>
            <div className='flex items-center justify-between'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full '></div>
                <h2>{moment(interview?.created_at).format('DD MMM yyy')}</h2>

            </div>
        </div>
    )
}

export default InterviewCard