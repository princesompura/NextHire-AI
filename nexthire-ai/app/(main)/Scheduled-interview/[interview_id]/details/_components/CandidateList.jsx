import React from 'react'

function CandidateList({ candidateList }) {
    return (
        <div className='p-5'>
            {candidateList.map((candidate,index)=>(
                <div key={index} className='p-5'>
                    <h2>{candidate.userName[0]}</h2>

                </div>
            ))}

        </div>
    )
}

export default CandidateList