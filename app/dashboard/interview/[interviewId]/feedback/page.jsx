"use client"; // Ensure this is at the very top

import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "utils/db";
import { userAnswer } from "utils/schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link"; // Import Link from Next.js
import { Button } from "@/components/ui/button";

// Function to calculate average rating
const getAverageRating = (ratings) => {
  // Filter out invalid or non-numeric ratings
  const validRatings = ratings.filter((rating) => typeof rating === 'number' && !isNaN(rating));

  if (validRatings.length === 0) return 0; // Return 0 if no valid ratings

  const total = validRatings.reduce((sum, rating) => sum + rating, 0); // Sum valid ratings
  const average = total / validRatings.length; // Calculate average

  return average.toFixed(1); // Return average with 1 decimal point
};

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0); // State for overall rating

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(userAnswer)
      .where(eq(userAnswer.mockIdRef, params.interviewId))
      .orderBy(userAnswer.id);
      
    setFeedbackList(result);

    // Extract all ratings from the feedbackList
    const ratings = result.map((item) => item.rating);
    const avgRating = getAverageRating(ratings); // Calculate average rating

    setOverallRating(avgRating); // Set the overall rating
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-600">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your Interview Feedback</h2>

      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-red-800">
          No Interview Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-blue-700 text-lg my-3">
            Overall interview Rating: <strong>{overallRating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-400">
            Find below Interview Questions with correct answers, Your Answer, and Feedback for improvement:
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-gray-100 flex justify-between gap-5 rounded-lg m-2 my-2 text-left w-full">
                  {item.question}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong> {item.userAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-100 text-sm text-green-900">
                      <strong>Correct Answer: </strong> {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-100 text-sm text-blue-900">
                      <strong>Feedback: </strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          <Link href="/dashboard">
            <Button className="btn my-10 ">Go Home</Button>{" "}
            {/* Using Link to navigate */}
          </Link>
        </>
      )}
    </div>
  );
};

export default Feedback;
