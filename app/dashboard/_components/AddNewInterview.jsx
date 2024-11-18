"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {db} from "@/utils/db";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const {user} = useUser();
    const router= useRouter();

    const onSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true);

        console.log("Job Role:", jobRole);
        console.log("Job Description:", jobDescription);
        console.log("Experience:", experience);

        const inputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDescription}, Years Of Experience: ${experience}, Depends on job position/role, job description/technical stack required. Give us 5 expected interview questions along with answers in JSON format.Dont give explaination just Questions and their answer in JSON format only!`;

      
            const result = await chatSession.sendMessage(inputPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');

            const parsedResponse = JSON.parse(mockJsonResp);
            console.log(parsedResponse);
            setJsonResponse(parsedResponse); 

            if(mockJsonResp){
                const resp = await db.insert(MockInterview)
                .values({
                    mockId:uuidv4(),
                    jobMockResp: JSON.stringify(parsedResponse),
                    jobPosition: jobRole,
                    jobDesc: jobDescription,
                    jobExperience: experience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('YYYY-MM-DD'),
                  
                    
                }).returning({mockId:MockInterview.mockId});
                console.log("Inserted ID: " ,resp)
                if(resp){
                    setOpenDialog(false);
                    router.push(`/dashboard/interview/${resp[0].mockId}`);

                }
                
            
            }
            else{
                console.log("error11")
            }
            setLoading(false);


        
    };

    return (
        <div>
            <div
                className="p-6 border rounded-lg bg-secondary hover:bg-secondary-dark hover:scale-105 hover:shadow-lg cursor-pointer transition-transform duration-200 ease-in-out"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-semibold text-lg text-center text-gray-800">+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-xl p-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            Tell us more about the job you are interviewing for
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 mt-4">
                            Add details about the position, a brief job description, and years of experience required.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-6 mt-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Role/Job Position
                            </label>
                            <Input
                                id="jobRole"
                                placeholder="e.g., Full Stack Developer"
                                required
                                onChange={(event) => setJobRole(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description/Tech Stack
                            </label>
                            <Textarea
                                id="jobDescription"
                                placeholder="e.g., React, Angular, Node.js, MySQL, etc."
                                required
                                onChange={(event) => setJobDescription(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                                Years of Experience
                            </label>
                            <Input
                                id="experience"
                                placeholder="e.g., 5"
                                max="70"
                                type="number"
                                required
                                onChange={(event) => setExperience(event.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-8">
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <LoaderCircle className='animate-spin' /> Loading...
                                    </>
                                ) : (
                                    "Start Interview"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
