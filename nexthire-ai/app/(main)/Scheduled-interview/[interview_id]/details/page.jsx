"use client"
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function InterviewDetail() {

    const { interview_id } = useParams();
    const { user } = useUser();

    useEffect(() => {
        user && GetInterviewDetail();
    }, [user])

    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition, interviewDuration, interview_id, interview-feedback(userEmail) ')
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

        console.log(result);

    }
    return (
        <div>InterviewDetail</div>
    )
}

export default InterviewDetail