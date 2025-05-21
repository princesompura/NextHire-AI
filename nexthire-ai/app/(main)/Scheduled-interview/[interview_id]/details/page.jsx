"use client"
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';

function InterviewDetail() {

    const { interview_id } = useParams();
    const { user } = useUser();
    const [interviewDetail, setInterviewDetail] = useState();

    useEffect(() => {
        user && GetInterviewDetail();
    }, [user])

    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interviews')
            .select(`jobPosition, jobDescription, type, questionList, interviewDuration, interview_id, created_at, 
                interview-feedback(userEmail, userName, feedback, created_at) `)
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

        setInterviewDetail(result.data[0]);
        console.log(result);

    }
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Interview Detail</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
        </div>
    )
}

export default InterviewDetail