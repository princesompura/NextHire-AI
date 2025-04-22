import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Calendar, Clock, Copy, ListChecks } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

function InterviewLink({ interviewId, formData }) {

    const GetInterviewUrl = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interviewId;
        return url;
    }

    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <Image src={'/check.png'} alt='check'
                width={200}
                height={200}
                className='w-[50px] h-[50px] '
            />
            <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready</h2>
            <p className='mt-3'>Share this link with your candidates to start the interview process</p>

            <div className='w-full p-7 mt-6 rounded-lg bg-blue-50'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold'>Interview Link</h2>
                    <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'>Valid for 30 days</h2>
                </div>
                <div className='mt-3 flex gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} className='border border-gray-400 text' />
                    <Button><Copy /> Copy Link</Button>
                </div>
                <hr className='my-5 border-gray-400' />

                <div className='flex gap-5'>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-04'/> {formData?.interviewDuration} </h2>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><ListChecks className='h-4 w-04'/> 10 Questions </h2>
                    {/* <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Calendar className='h-4 w-04'/> 30 Mins{formData?.interviewDuration} </h2> */}
                </div>
            </div>
        </div>
    )
}

export default InterviewLink