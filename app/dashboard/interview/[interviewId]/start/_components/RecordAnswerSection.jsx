"use client";

import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image'; 
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db'; 
import {UserAnswer} from '@/utils/schema';


function RecordAnswerSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
    const { user } = useUser();
    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const webcamRef = useRef(null);
    console.log("interviewData:", interviewData);

    // Update userAnswer whenever results change
    useEffect(() => {
        setUserAnswer(results.map(result => result.transcript).join(' '));
    }, [results]);

    // Retry logic for API calls
    const fetchWithRetry = async (message, retries = 3, delay = 1000) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const result = await chatSession.sendMessage(message);
                return result.response.text();
            } catch (error) {
                if (attempt < retries && error.message.includes("503")) {
                    await new Promise(res => setTimeout(res, delay * attempt));
                } else {
                    throw error;
                }
            }
        }
    };

    const handleSaveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
    
            
            if (userAnswer.length < 10) {
                toast.error("Answer too short. Please record again!");
                return;
            }
    
            
            let mockInterviewQuestions = [];
            try {
                mockInterviewQuestions = JSON.parse(interviewData?.jobMockResp || "[]");
            } catch (error) {
                console.error("Error parsing jobMockResp:", error);
                toast.error("Failed to load interview questions. Please try again.");
                return;
            }
    
            const activeQuestion = mockInterviewQuestions[activeQuestionIndex];
            if (!activeQuestion) {
                toast.error("No active question found. Please reload the page.");
                return;
            }
    
            const feedbackPrompt = `Question: ${activeQuestion.question}, user answer: ${userAnswer}. Based on this question and user answer, please give a rating and feedback in four-five lines on areas of improvement in JSON format with fields for "rating" and "feedback".`;
    
            try {
                // Fetch feedback from AI
                const rawResponse = await fetchWithRetry(feedbackPrompt);
                console.log("Full raw response:", rawResponse);
    
                if (!rawResponse) {
                    console.error("Error: Empty AI response received.");
                    toast.error("Failed to get feedback from AI.");
                    return;
                }
    
                // Clean and parse the response
                let mockJsonResp = rawResponse;
                if (mockJsonResp.includes("```json")) {
                    mockJsonResp = mockJsonResp.replace(/```json|```/g, '').trim();
                }
    
                let feedbackData;
                try {
                    feedbackData = JSON.parse(mockJsonResp);
                    console.log("Cleaned and Parsed Feedback Data:", feedbackData);
    
                    if (!feedbackData?.rating || !feedbackData?.feedback) {
                        feedbackData = {
                            rating: 0,
                            feedback: "AI was unable to provide feedback. Please try again."
                        };
                    }
                } catch (error) {
                    console.error("Error parsing AI feedback:", error);
                    toast.error("Failed to parse AI feedback. Please try again.");
                    return;
                }
    
                // Check for mockId
                const mockId = interviewData?.mockId;
                if (!mockId) {
                    console.error("Error: mockId is undefined.");
                    toast.error("Error: Mock interview ID is missing.");
                    return;
                }
    
                // Save feedback to the database
                try {
                    const resp = await db.insert(UserAnswer).values({
                        mockIdRef: mockId,
                        question: activeQuestion.question,
                        correctAns: activeQuestion.answer,
                        userAns: userAnswer,
                        feedback: feedbackData.feedback,
                        rating: feedbackData.rating,
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format("DD-MM-YYYY"),
                    });
    
                    if (resp) {
                        toast.success("Feedback saved successfully!");
                    }
                } catch (error) {
                    console.error("Error saving feedback to database:", error);
                    toast.error("Failed to save feedback. Please try again.");
                }
            } catch (error) {
                console.error("Error during API call or fetching feedback:", error);
                toast.error("Failed to fetch feedback from AI. Please try again.");
            }
        } else {
            startSpeechToText();
        }
    };
    
    
    
    

    return (
        <div className="flex items-center justify-center flex-col">
            {/* Webcam Section */}
            <div className="relative flex flex-col mt-20 bg-black justify-center items-center rounded-lg">
                <Image
                    src="/webcam.png"
                    width={200}
                    height={200}
                    alt="Webcam Icon"
                    className="absolute"
                />
                <Webcam
                    ref={webcamRef}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                        border: '1px solid #000',
                    }}
                />
            </div>

            {/* Record Button */}
            <Button
                variant="outlined"
                className="my-10"
                onClick={handleSaveUserAnswer}
            >
                {isRecording ? (
                    <span className="text-red-600 flex gap-2">
                        <Mic /> Recording...
                    </span>
                ) : (
                    'Record Answer'
                )}
            </Button>

            {/* Debug Button */}
            <Button onClick={() => console.log(userAnswer)} variant="outline">
                Show User Answer
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
