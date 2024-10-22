import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const InterviewItemCard = ({interview}) => {

  return (
    <div className=' border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-blue-700'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience</h2>

        <h2 className='text-xs text-gray-500'>Created At : {interview?.createdAt}</h2>


        <div className='flex justify-between mt-2 gap-5 w-full'>
            <Link href={`/dashboard/interview/${interview?.mockId}/feedback`}>
                <Button className="btn-outline" varient="outline" size="sm" 
                > Feedback</Button>
            </Link>

            <Link href={`/dashboard/interview/${interview?.mockId}`}>
                <Button className="btn " size="sm"
                >Start</Button>
            </Link>
                
        </div>
    </div>
  )
}
