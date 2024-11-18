"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation'; // Import useParams
import Link from 'next/link';
function StartInterview() {
    const params = useParams(); // Use useParams to get the params
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); // Start from first question
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));
            
            if (result.length > 0 && result[0].jobMockResp) {
                try {
                    const jsonmockResp = JSON.parse(result[0].jobMockResp);
                    setMockInterviewQuestions(jsonmockResp);
                    setInterviewData(result[0]);
                } catch (jsonError) {
                    console.error("Error parsing JSON response:", jsonError);
                    setError("Failed to parse interview questions.");
                }
            } else {
                setError("No mock interview response found for the given ID.");
            }
        } catch (fetchError) {
            console.error("Error fetching interview details:", fetchError);
            setError("Failed to fetch interview details.");
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (activeQuestionIndex < mockInterviewQuestions.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Questions Section */}
            <QuestionSection 
                mockInterviewQuestions={mockInterviewQuestions}
                activeQuestionIndex={activeQuestionIndex}
            />
            {/* Recording Section */}
            <RecordAnswerSection
                mockInterviewQuestions={mockInterviewQuestions}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />
            {/* Navigation Buttons */}
            <div className="flex justify-end gap-6 mt-4">
                {activeQuestionIndex > 0 && (
                    <Button onClick={handlePreviousQuestion}>Previous Question</Button>
                )}
                {activeQuestionIndex < mockInterviewQuestions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                ) : (
                    <Link
                        href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
                    >
                        <Button>End Interview</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default StartInterview;
