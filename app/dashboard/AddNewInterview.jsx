"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "utils/GeminiAI";
import { db } from "utils/db";
import {MockInterview } from "utils/schema";

import { v4 as uuidv4 } from 'uuid';


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);

    const [jsonResponse , setJsonResponse] = useState([]);

    const router = useRouter();

    const {user} = useUser();

    const OnSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        try {
            const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in JSON format.`;

            const result = await chatSession.sendMessage(inputPrompt);

            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const parsedResponse = JSON.parse(mockJsonResp);
            console.log(parsedResponse);

            setJsonResponse(mockJsonResp);

            if(mockJsonResp) {
                const resp = await db.insert(MockInterview).values({
                    mockId : uuidv4(),
                    jsonMockRes : mockJsonResp,
                    jobPosition : jobPosition,
                    jobDesc : jobDesc,
                    jobExperience : jobExperience,
                    createdBy : user?.primaryEmailAddress.emailAddress,
                    createdAt : moment().format('YYYY-MM-DD'), 
                }).returning({mockId : MockInterview.mockId});
    
                console.log("Inserted ID: " , resp);

                if(resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            }
            else{
                console.log("ERROR");
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching interview questions:', error);
        }


    };

    return (
        <div>
            <div
                className="p-5 border rounded-lg bg-gray-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog} className=" fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                <DialogContent className=" inset-0 flex justify-center items-center p-4 bg-black bg-opacity-50 ">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <DialogHeader >
                            <DialogTitle className="text-2xl font-bold">Tell us more About your Job Interviewing</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={OnSubmit}>
                                    <div>
                                        <h2>Add Details about your job position/role, Job description and years of experience</h2>

                                        <div className="text-left mt-7 my-3 font-semibold">
                                            <label >Job Role/Job Position</label>
                                            <Input placeholder="Ex. Full Stack Developer" className="p-2"
                                                onChange={(event) => setJobPosition(event.target.value)}
                                                required />
                                        </div>

                                        <div className="text-left mt-7 my-3 font-semibold">
                                            <label >Job Description/Tech Stack (in short)</label>
                                            <Textarea placeholder="Ex. React, Angular , Node.js ..." className="p-2"
                                                onChange={(event) => setJobDesc(event.target.value)} required />
                                        </div>

                                        <div className="text-left mt-7 my-3 font-semibold">
                                            <label >Years of experience</label>
                                            <Input placeholder="2" type="number" max="50" className="p-2"
                                                onChange={(event) => setJobExperience(event.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button variant="outline" className="btn" type="submit" disabled={loading}>
                                            {loading ?
                                                <>
                                                    <LoaderCircle  className="animate-spin"/>'Generating from AI'
                                                </> : 'Start Interview'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default AddNewInterview;
