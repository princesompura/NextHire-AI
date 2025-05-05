import Image from 'next/image'
import React from 'react'

function InterviewCompleted() {
  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 '>
      <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20'>
        <Image src={'/check.png'} alt='check' width={200} height={100}
          className='w-[60px]' />
        <h2 className='mt-3 font-bold text-2xl'>Interview Completed !!</h2>
        <h2 className='mt-1 text-gray-400'>Thank you for participating in this Interview with NextHire AI</h2>

        <Image src={'/completed.png'} alt='completed'
          width={500}
          height={500}
          className='w-[450px] my-6'
          priority
        />

        <div className='p-3 bg-blue-50 flex gap-4 rounded-lg mt-5'>

          <div className='flex flex-col items-center'>
            <Image  src={'/thinking.png'} alt='thinking' width={50} height={50} />
            <h2 className='font-bold mt-3'>Now What's Next</h2>
            <p className='text-center'>The recruiters will review your interview and they will contact you about that soon</p>
          </div>
        </div>



      </div>
    </div>
  )
}

export default InterviewCompleted