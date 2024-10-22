"use client";

import React, { useState, useEffect } from 'react';
import { MockInterview } from "utils/schema";
import { db } from "utils/db";
import { eq } from "drizzle-orm";
import dynamic from 'next/dynamic';

import QuestionsSection from "./_components/QuestionsSection";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// Dynamically import the component with `ssr: false`
const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'),
    { ssr: false }
  );

const StartInterview = ({ params }) => {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQue, setMockInterviewQue] = useState();

    const[activeQuestionIndex , setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            // Filter by interviewId
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result.length === 0) {
                throw new Error("No interview found with the given ID.");
            }

            if (result.length > 0) {
                    const jsonMockResp = JSON.parse(result[0].jsonMockRes);
                    
                    console.log(jsonMockResp);

                    setMockInterviewQue(jsonMockResp);
                    setInterviewData(result[0]);
            } 
            else {
                console.warn("No interview data found for this ID");
            }


        } catch (error) {
            console.error("Error fetching interview details: ", error.message);
        }

    };

    return (
        <div>
            <div className='grid grid-col-1 md:grid-cols-2 gap-10 mx-20'>
            {/* Question */}
            <QuestionsSection  
            mockInterviewQue= {mockInterviewQue}
                activeQuestionIndex={activeQuestionIndex}
            />

            {/* Vidio / Audio recording */}
            <RecordAnswerSection 
                mockInterviewQue= {mockInterviewQue}
                activeQuestionIndex={activeQuestionIndex}
                interviewData= {interviewData}
            />
            </div>
            {/* Buttons to move on next question or previos question */}
            <div className='flex justify-end gap-10 '>
                {activeQuestionIndex > 0 &&
                    <Button className="btn" onClick={()=> setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>
                }
                
                {activeQuestionIndex != mockInterviewQue?.length-1 &&
                    <Button className="btn" 
                    onClick={()=> setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
                }

                {activeQuestionIndex == mockInterviewQue?.length-1 &&
                    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                    <Button className="btn">End Interview</Button>
                    </Link>
                }
                
            </div>
        </div>
    );
};

export default StartInterview