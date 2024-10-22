"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import { db } from "utils/db";
import { MockInterview } from "utils/schema";
import { eq, desc } from "drizzle-orm";
import { InterviewItemCard } from "./InterviewItemCard";

const InterviewList = () => {
    const { user } = useUser(); // Get the current user
    const [interviewList, setInterviewList] = useState([]); // State for holding the interview list
    const [errorMessage, setErrorMessage] = useState(null); // Optional: For handling errors

    // Function to get the interview list
    const GetInterviewList = async () => {
        if (!user) {
            setErrorMessage("User is not logged in.");
            return;
        }

        const userEmail = typeof user?.primaryEmailAddress === 'string' 
            ? user.primaryEmailAddress.trim() 
            : user?.primaryEmailAddress?.emailAddress?.trim(); // Safely access email address from the object

        console.log("Querying for email:", userEmail);

        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, userEmail)) // Use userEmail for filtering
                .orderBy(desc(MockInterview.id)); // Order the results

            console.log("Filtered Interview List Query Result: ", result);
            setInterviewList(result); // Set the results in the state
        } catch (error) {
            console.error("Error fetching interviews:", error);
            setErrorMessage("Error fetching interview list.");
        }
    }

    // Call GetInterviewList inside useEffect when the user changes
    useEffect(() => {
        if (user) {
            console.log("Fetching interview list...");
            GetInterviewList(); // Fetch the interview list when user is available
        }
    }, [user]); // Dependency array includes `user`

    // useEffect to log interviewList when it changes
    useEffect(() => {
        console.log("Interview list updated: ", interviewList);
    }, [interviewList]);

    return (
        <div>
            <h2 className='font-md text-xl'>Previous Mock Interviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                {interviewList&&interviewList.map((interview, index)=> (
                    <InterviewItemCard key={index} interview={interview}/>
                ))
                }
            </div>
        </div>
    )
}

export default InterviewList;
