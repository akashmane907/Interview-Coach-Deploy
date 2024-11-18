"use client";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner'; // Importing toast

const ContactMe = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_u2mqrb7', // Replace with your Email.js service ID
                'template_km6tbad', // Replace with your Email.js template ID
                form.current,
                'Jp2k_CxXfGoiUASCF' // Replace with your Email.js public key
            )
            .then(
                () => {
                    toast.success('Your message has been sent successfully!'); // Success toast
                    form.current.reset(); // Clear the form after successful submission
                },
                (error) => {
                    toast.error('Failed to send the message. Please try again.'); // Error toast
                    console.error(error.text);
                }
            );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Me</h1>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6 mb-10">
                <a
                    href="https://www.instagram.com/akashmane907/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 text-3xl"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://www.linkedin.com/in/akash-mane-bb98a21b7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-3xl"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://wa.me/7400387427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-3xl"
                >
                    <FaWhatsapp />
                </a>
            </div>

            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                    <label htmlFor="user_name" className="block text-gray-600 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="user_email" className="block text-gray-600 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-gray-600 mb-2">
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactMe;
