import React from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Interview() {
    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52'>
                <Image src={'/logo.png'} alt='logo' width={200} height={100}
                    className='w-[140px]' />
                <h2 className='mt-3'>AI-Powered Interview Plateform</h2>

                <Image src={'/interview.png'} alt='interview'
                    width={500}
                    height={500}
                    className='w-[250px] my-6'
                />
                <h2 className='font-bold text-xl'>Full Stack Developer Interview</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' />30 Minutes</h2>

                <div className='w-full'>
                    <h2>Enter your full name</h2>
                    <Input placeholder='e.g. Virat Kohli' />
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

                <Button className={'mt-5 w-full font-bold'}><Video/>Join Interview</Button>
            </div>
        </div>
    )
}

export default Interview