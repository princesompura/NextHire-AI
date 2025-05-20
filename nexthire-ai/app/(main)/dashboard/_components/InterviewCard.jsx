import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail=false }) {

    const url= process.env.NEXT_PUBLIC_HOST_URL+interview?.interview_id

    const copyLink = () =>{
        
        navigator.clipboard.writeText(url);
        toast('Copied')
    }

    const onSend=()=>{
        window.location.href="mailto:accounts@gmail.com?subject= Interview Link & body=Interview Link:" + url 
    }


    return (
        <div className='p-5 bg-blue-50 rounded-lg border mt-5'>
            <div className='flex items-center justify-between'>
                <div className='h-[40px] w-[40px] bg-primary rounded-full '></div>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>

            </div>
            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.interviewDuration}
                <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
            </h2>
            {!viewDetail? <div className='flex gap-3 mt-2'>
                <Button variant='outline' className=' bg-blue-200 hover:bg-blue-300 cursor-pointer' onClick={copyLink}> <Copy/> Copy Link</Button>
                <Button className='bg-blue-200 hover:bg-blue-300 text-black cursor-pointer' onClick={onSend}> <Send className='text-black'/> Mail To</Button>
            </div>
            :
            <Button className='mt-5 w-full bg-blue-200 hover:bg-blue-300' variant='outline'>View Detail<ArrowRight /></Button>
            }

        </div>
    )
}

export default InterviewCard