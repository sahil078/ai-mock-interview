"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "utils/GeminiAI";
import { db } from "utils/db";
import { MockInterview, userAnswer } from "utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ mockInterviewQue, activeQuestionIndex, interviewData }) => {

    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [fullTranscript, setFullTranscript] = useState("");
    const recognitionRef = useRef(null);

    // This useEffect will trigger the updateUserAnswer only when the recording stops
    useEffect(() => {
        if (!recording && fullTranscript.length > 10) {
            updateUserAnswer(); // Call this when recording stops and we have enough transcript
        }
    }, [recording]); // Trigger only on recording state change

    const handleStartRecording = () => {
        setFullTranscript("");
        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let currentTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    currentTranscript = transcript;
                    setFullTranscript(prev => `${prev} ${currentTranscript}`);
                }
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
        };

        recognition.onend = () => {
            setRecording(false); // Stop recording on recognition end
        };

        recognition.start();
        setRecording(true);
    };

    const handleStopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop(); // Stop the speech recognition

            if (fullTranscript.length < 10) {
                toast.error("Error: Please speak for at least 10 characters.");
                setRecording(false); // Ensure we update the recording state
                return; // Exit early
            }

            setRecording(false); // This will trigger the useEffect to save data
        }
    };

    const updateUserAnswer = async () => {
        try {
            setLoading(true);

            // get the active question and answer from the props
            const currentQuestion = mockInterviewQue[activeQuestionIndex]?.Question;
            const correctAnswer = mockInterviewQue[activeQuestionIndex]?.Answer;

            // Check if active question is valid 
            if (!currentQuestion) {
                toast.error("No question available to record the answer.");
                setLoading(false);
                return;
            }

            // Generate feedback prompt
            const feedbackPrompt = `Question: ${currentQuestion}, User Answer: ${fullTranscript}. Please give a rating and feedback (3 to 5 lines in JSON format) based on the comparison of both answers.`;

            const result = await chatSession.sendMessage(feedbackPrompt);

            // Clean JSON formatting and parse it
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            console.log(mockJsonResp);

            const jsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(userAnswer).values({
                mockIdRef: interviewData?.mockId || "unknown", // Ensure mockId is valid
                question: currentQuestion, // Use the valid question
                correctAnswer: correctAnswer || "No correct answer provided", // Fallback if correct answer is missing
                userAnswer: fullTranscript, // Use the recorded transcript
                feedback: jsonFeedbackResp?.Feedback || "No feedback provided", // Use feedbackJson for feedback
                rating: jsonFeedbackResp?.Rating || 0, // Use feedbackJson for rating, ensure it's numeric
                userEmail: user?.primaryEmailAddress?.emailAddress || "unknown", // Ensure email is valid
                createdAt: moment().format('DD-MM-YYYY'), // Use current date
            })

            console.log(jsonFeedbackResp?.Feedback);
            console.log(jsonFeedbackResp?.Rating);
            console.log(jsonFeedbackResp);


            if (resp) {
                toast.success("User answer recorded successfully.");
            }
        } catch (error) {
            console.error("Error saving data:", error); // Log the error
            toast.error("An error occurred while saving the data. Please try again.");
        } finally {
            setLoading(false); // Stop loading in all cases
        }
    };


    return (
        <div className="flex flex-col justify-center items-center my-16">
            <div className="flex flex-col items-center justify-center">
                <div className="absolute bg-gray-500 bg-center bg-cover flex items-center justify-center rounded-lg p-20 w-[35vw]">
                    <Image
                        src="/webcam.jpg"
                        alt="webcam"
                        width={200}
                        height={200}
                        className="rounded-lg"
                    />
                </div>
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10,
                    }}
                />
            </div>

            <div className="my-10 flex flex-col gap-5">
                <h1>Recording: {recording ? 'In Progress' : 'Stopped'}</h1>
                <Button className="btn-outline flex" variant="outline" onClick={recording ? handleStopRecording : handleStartRecording}>
                    {recording ? (
                        <h2 className="text-red-600 text-md">
                            <AudioWaveform className="inline" />
                            <StopCircle /> Recording....
                        </h2>
                    ) : (
                        <div className="flex items-center">
                            <Mic className="w-5 inline" /> Record Answer
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default RecordAnswerSection;
