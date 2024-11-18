"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const UpgradePage = () => {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            features: [
                "5 Mock Interviews per month",
                "Basic feedback on answers",
                "Access to common questions"
            ],
            buttonText: "Current Plan",
            isCurrent: true
        },
        {
            name: "Pro",
            price: "₹799/month",
            features: [
                "Unlimited Mock Interviews",
                "Detailed feedback with scoring",
                "Advanced question bank access",
                "Downloadable feedback reports"
            ],
            buttonText: "Upgrade to Pro",
            isCurrent: false
        },
        {
            name: "Elite",
            price: "₹1,499/month",
            features: [
                "All Pro features",
                "1:1 Interview Coaching",
                "Custom question sets",
                "Priority support"
            ],
            buttonText: "Upgrade to Elite",
            isCurrent: false
        }
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Upgrade Your Plan</h1>
            <p className="text-center text-gray-600 mb-12">
                Take your preparation to the next level with our premium plans.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg shadow-md ${
                            plan.isCurrent ? "bg-blue-50" : "bg-white"
                        } border border-gray-200`}
                    >
                        <h2 className="text-2xl font-semibold text-center mb-4">
                            {plan.name}
                        </h2>
                        <p className="text-center text-xl font-bold text-primary mb-6">
                            {plan.price}
                        </p>
                        <ul className="mb-6 space-y-3">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-green-500">✔</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <div className="text-center">
                            <Button
                                className={`w-full ${
                                    plan.isCurrent ? "bg-gray-300" : "bg-primary text-white"
                                }`}
                                disabled={plan.isCurrent}
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePage;
