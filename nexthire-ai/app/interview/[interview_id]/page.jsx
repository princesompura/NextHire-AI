"use client"
import React, { useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'

function Interview() {

    const { interview_id } = useParams();
    console.log(interview_id);
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,interviewDuration,type")
                .eq('interview_id', interview_id)
            setInterviewData(Interviews[0]);
            setLoading(false);
            if(Interviews?.length==0)
            {
                toast('Incorrect Interview Link')
                return ;
            }
            
        }
        catch(e){
            setLoading(false);
            toast('Incorrect Interview Link')
        }
            
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 '>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                    className='w-[140px]' />
                <h2 className='mt-3'>AI-Powered Interview Plateform</h2>

                <Image src={'/interview.png'} alt='interview'
                    width={500}
                    height={500}
                    className='w-[250px] my-6'
                    priority
                />
                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' />{interviewData?.interviewDuration}</h2>

                <div className='w-full mt-2'>
                    <h2>Enter your full name</h2>
                    <Input placeholder='e.g. Virat Kohli' className='mt-1' />
                </div>
                <div className='p-3 bg-blue-50 flex gap-4 rounded-lg mt-5'>
                    <Info className='text-primary' />
                    <div>
                        <h2 className='font-bold'>Before you begin</h2>
                        <ul className=''>
                            <li className='text-sm text-primary'>- Ensure you have a stable internet connection</li>
                            <li className='text-sm text-primary'>- Test your camera and microphone</li>
                            <li className='text-sm text-primary'>- Find a quiet place for your interview</li>
                        </ul>
                    </div>
                </div>

                <Button className={'mt-5 w-full font-bold'}><Video />Join Interview</Button>
            </div>
        </div>
    )
}

export default Interview