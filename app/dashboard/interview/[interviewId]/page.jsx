"use client";
import React, { useEffect, useState } from "react";
import { MockInterview } from "utils/schema";
import { db } from "utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null); // Initialize as null
    const [webCamEnable, setWebcamEnable] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            // Filter by interviewId
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            console.log("Filtered Result: ", result);
            if (result.length > 0) {
                setInterviewData(result[0]); // Set interviewData only if the result is not empty
            } else {
                console.warn("No interview data found for this ID");
            }
        } catch (error) {
            console.error("Error fetching interview details: ", error);
        }
    };

    return (
        <div className="my-10">
            <h2 className="font-bold font-2xl text-center">Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    {interviewData ? (
                        <div className="flex flex-col gap-5 p-5 rounded-lg border">
                            <>
                                <h2 className="text-lg">
                                    <strong>Job Role/Job Position :</strong> {interviewData.jobPosition}
                                </h2>

                                <h2 className="text-lg">
                                    <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                                </h2>

                                <h2 className="text-lg">
                                    <strong>Job Experience:</strong> {interviewData.jobExperience}
                                </h2>
                            </>

                            <div className="p-5 border rounded-lg border-yellow-600 bg-yellow-100">
                                <h2 className="flex gap-2 items-center text-yellow-700"> <Lightbulb/> <span><strong>
                                    Information
                                </strong></span></h2>
                                <h2 className="mt-3 text-yellow-700">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                            </div>
                        </div>
                    ) : (
                        <p>Loading interview details...</p>
                    )}
                </div>

                <div>
                    {webCamEnable ? (
                        <Webcam
                            onUserMedia={() => setWebcamEnable(true)}
                            onUserMediaError={() => setWebcamEnable(false)}
                            mirrored={true}
                            style={{
                                height: 400,
                                width: 400,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-[40vh] w-full my-5 p-10 bg-gray-200 rounded-lg border" />
                            <Button variant="outline" className="btn" onClick={() => setWebcamEnable(true)}>Enable Web Cam and Start Interview</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button variant="outline" className="btn">Start Interview</Button>
                </Link>
            </div>

        </div>
    );
}

export default Interview;
