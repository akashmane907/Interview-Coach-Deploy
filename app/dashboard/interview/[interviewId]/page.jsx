"use client";
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState, useRef } from 'react';
import { db } from '@/utils/db'; 
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function Interview({ params }) {
    const [interviewData, setInterviewData] = useState();
    const [interviewDetails, setInterviewDetails] = useState(null); 
    const webcamRef = useRef(null); // Use useRef for the webcam

    useEffect(() => {
        console.log(params);
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));
            
            console.log(result);

            if (result.length > 0) {
                setInterviewDetails(result[0]); 
                setInterviewData(result[0]); 
            } else {
                console.log("No interview found for the given ID.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    const handleUserMedia = () => {
        console.log("Webcam and microphone are enabled.");
    };

    const handleUserMediaError = () => {
        console.error("Error accessing webcam or microphone.");
    };

    return (
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's get Started!</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>

                <div className='flex flex-col my-5 gap-5 '>
                    {interviewData ? (
                        <>
                            <div className='flex flex-col p-5 rounded-lg border gap-5'>
                                <h2 className='text-lg'><strong>Job Role/Position:</strong> {interviewData.jobPosition}</h2>
                                <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                                <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                            </div>
                            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-200'>
                                <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
                                <h2 className='mt-3 text-yellow-600'>
                                    <p className="text-lg mb-3">
                                        To start your session with your Interview Coach, please <strong>turn on your webcam</strong>.
                                        You will be asked <strong>5 questions</strong> during the interview, designed to simulate a real interview experience.
                                    </p>
                                    <h3 className="text-xl font-semibold mb-2">Before you begin:</h3>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Ensure your webcam and microphone are enabled.</li>
                                        <li>Find a quiet and well-lit space to participate.</li>
                                        <li>Join the session ready to engage and showcase your skills!</li>
                                    </ul>
                                    <p className="text-lg font-bold">Good luck, and let's get started!</p>
                                </h2>
                            </div>
                        </>
                    ) : (
                        <p>Loading details...</p>
                    )}
                </div>

                <div>
                    {webcamRef.current ? (
                        <Webcam
                            audio={true}
                            ref={webcamRef}
                            onUserMedia={handleUserMedia}
                            onUserMediaError={handleUserMediaError}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button className='bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition ease-in-out duration-150' onClick={() => webcamRef.current = true}>
                                Enable webcam and Microphone
                            </Button>
                        </>
                    )}
                </div>

            </div>
            <div>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-600 transition ease-in-out duration-150'>
                    Start
                </Button>
                </Link>

            </div>
            
        </div>
    );
}

export default Interview;
