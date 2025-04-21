import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'


function FormContainer({onHandleInputChange, GoToNext }) {

    const [interviewType, setInterviewType]=useState([]);

    useEffect(()=>{
        if(interviewType)
        {
            onHandleInputChange('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType=(type)=>{
        const data = interviewType.includes(type);
        if(!data)
        {
            setInterviewType(prev => [...prev, type])
        }
        else{
            const result = interviewType.filter(item=>item!=type);
            setInterviewType(result);
        }
    }
    return (
        <div className='p-5 bg-blue-50 rounded-2xl'>
            <div>
                <h2 className='text-sm font-medium'>Job Position</h2>
                <Input placeholder="eg. Machine Learning Developer" className='mt-2 border-gray-400'
                onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description</h2>
                <Textarea placeholder="Enter the job description." className='mt-2 h-[200px] border-gray-400'
                onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Duration</h2>
                <Select onValueChange={(value)=>onHandleInputChange('interviewDuration',value)}>
                    <SelectTrigger className="w-full mt-2 border-gray-400">
                        <SelectValue placeholder="Select Duraton" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5 Minutes">5 Minutes</SelectItem>
                        <SelectItem value="15 Minutes">15 Minutes</SelectItem>
                        <SelectItem value="30 Minutes">30 Minutes</SelectItem>
                        <SelectItem value="45 Minutes">45 Minutes</SelectItem>
                        <SelectItem value="60 Minutes">60 Minutes</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Type</h2>
                <div className='flex gap-3 flex-wrap mt-2' >
                    {InterviewType.map((type, index) => (
                        <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-blue-50 border border-gray-400 rounded-2xl hover:bg-blue-100 ${interviewType.includes(type.title)&&'bg-blue-100 text-primary'}`}
                        onClick={()=>AddInterviewType(type.title)}>
                            <type.icon className='h-4 w-4' />
                            <span>{type.title}</span>

                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-7 flex justify-end ' onClick={()=>GoToNext()}>
                <Button className='cursor-pointer'>Generate Questions<ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer
