import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Timer, TimerIcon } from 'lucide-react'
import React, { useContext } from 'react'

function StartInterview() {
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
  return (
    <div>
      <h2>AI Interview Session
        <span>
          <TimerIcon/>
          00:00:00
        </span>
      </h2>
    </div>
  )
}

export default StartInterview