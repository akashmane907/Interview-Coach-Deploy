"use client";
import React from "react";

export default function QuestionsPage() {
    const faqData = [
        {
            question: "What is this platform about?",
            answer: "This platform helps you prepare for interviews by simulating mock interview sessions and providing feedback to improve your skills."
        },
        {
            question: "How do I start a mock interview?",
            answer: "Go to your Dashboard and click 'Add Interview'. Fill in the job details and start your mock interview session."
        },
        {
            question: "How many questions are in a mock interview?",
            answer: "Each mock interview consists of 5 questions designed to simulate a real interview experience."
        },
        {
            question: "Do I need a webcam and microphone?",
            answer: "Yes, you need a webcam and microphone to participate in the mock interview sessions."
        },
        {
            question: "Can I view feedback after the session?",
            answer: "Yes, detailed feedback will be provided at the end of your session, helping you identify areas of improvement."
        },
        {
            question: "How do I upgrade my account?",
            answer: "Navigate to the 'Upgrade' section on the dashboard to explore premium features and plans."
        }
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="border-b pb-4">
                        <h2 className="text-xl font-semibold">{faq.question}</h2>
                        <p className="mt-2 text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
