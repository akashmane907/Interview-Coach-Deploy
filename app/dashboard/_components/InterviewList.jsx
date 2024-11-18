"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import InterviewCard from "./InterviewCard";

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id));

            setInterviewList(result);
        } catch (err) {
            console.error("Error fetching interview list:", err);
            setError("Failed to load interviews. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div>
            <h2 className="font-bold text-2xl mb-4">Previous Mock Interviews</h2>
            {interviewList.length === 0 ? (
                <div>No previous mock interviews found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-3">
                    {interviewList&&interviewList.map((interview,index)=>(
                        <InterviewCard
                        interview={interview}
                        key={index}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InterviewList;
