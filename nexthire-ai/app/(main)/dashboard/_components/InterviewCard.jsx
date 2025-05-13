import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview }) {

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
            <h2 className='mt-2 '>{interview?.interviewDuration}</h2>
            <div className='flex gap-3 mt-2'>
                <Button variant='outline' className=' bg-blue-100 hover:bg-blue-200 cursor-pointer' onClick={copyLink}> <Copy/> Copy Link</Button>
                <Button className='bg-blue-100 hover:bg-blue-200 cursor-pointer' onClick={onSend}> <Send className='text-black'/> </Button>
            </div>

        </div>
    )
}

export default InterviewCard