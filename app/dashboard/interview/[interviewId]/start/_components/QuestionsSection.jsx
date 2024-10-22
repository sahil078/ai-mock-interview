import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQue, activeQuestionIndex}) => {

    const textToSpeach = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support this feature");
        }
    };   

  return mockInterviewQue &&(
    <div className='p-5 border rounded-lg my-10 w-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQue&&mockInterviewQue.map((question , index) => (
                <h2 className={`p-2 bg-gray-200 rounded-full text-xs md:text-sm text-center cursor-pointer
                ${activeQuestionIndex==index &&'text-white bg-green-800'}`}
                key={index}
                >Question # {index+1}</h2>
            ))}
 
        </div>

        <h2 className='mt-5 font-semibold text-md md:text-lg'>{mockInterviewQue[activeQuestionIndex]?.Question}</h2>
        <Volume2 className='cursor-pointer mb-5 text-sm' onClick={() => textToSpeach(mockInterviewQue[activeQuestionIndex]?.Question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-15'>
            <h2 className='flex gap-2 items-center text-blue-700'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>

            <h2 className='text-sm text-blue-700 my-5'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>
  )
}

export default QuestionsSection