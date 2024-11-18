"use client";

import React from "react";
import { Button } from "@/components/ui/button";

function HowItWorks() {
    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    How It Works
                </h1>
                <p className="mt-2 text-gray-600">
                    Get ready for your next interview with our comprehensive mock interview process.
                </p>
            </header>

            {/* Step 1: Add Interview */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800">1. Add Interview</h2>
                <p className="mt-2 text-gray-600">
                    Start by clicking <strong>Add Interview</strong> on your dashboard.
                </p>
                <p className="text-gray-600">
                    Provide details about the job you're preparing for to tailor the mock interview experience.
                </p>
                <ul className="list-disc pl-6 mt-4 text-gray-600 space-y-2">
                    <li>
                        <strong>Job Role/Job Position:</strong> Enter the title of the position, e.g., Full Stack Developer.
                    </li>
                    <li>
                        <strong>Job Description/Tech Stack:</strong> Include key technologies, e.g., React, Angular, Node.js.
                    </li>
                    <li>
                        <strong>Years of Experience:</strong> Specify required experience, e.g., 5 years.
                    </li>
                </ul>
                <div className="mt-4">
                    <Button variant="secondary">Add Interview</Button>
                </div>
            </section>

            {/* Step 2: Information */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800">2. Information</h2>
                <p className="mt-2 text-gray-600">
                    After adding the interview details, you’ll receive guidance on preparing for your session with your Interview Coach.
                </p>
                <ul className="list-disc pl-6 mt-4 text-gray-600 space-y-2">
                    <li>Ensure your webcam and microphone are enabled.</li>
                    <li>Find a quiet, well-lit space for the interview.</li>
                    <li>Prepare for a set of 5 questions to simulate a real interview experience.</li>
                </ul>
                <div className="mt-4">
                    <Button variant="secondary">Learn More</Button>
                </div>
            </section>

            {/* Step 3: Start Interview */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800">3. Start Interview</h2>
                <p className="mt-2 text-gray-600">
                    Begin your mock interview session by clicking <strong>Start Interview</strong>.
                </p>
                <p className="text-gray-600">
                    This session is designed to replicate a real-world interview scenario, giving you invaluable practice and feedback.
                </p>
                <div className="mt-4">
                    <Button variant="primary">Start Interview</Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-gray-600 mt-10">
                <p>
                    Need help? Visit our <a href="/faq" className="text-blue-600 underline">FAQ</a> or <a href="/support" className="text-blue-600 underline">Contact Support</a>.
                </p>
            </footer>
        </div>
    );
}

export default HowItWorks;
