"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

function Header() {
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path);
    }, [path]);

    const navigateTo = (route) => {
        router.push(route); // Programmatically navigate using Next.js router
    };

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={60} height={40} alt='logo' />
            <ul className='flex gap-20'>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        path === '/dashboard' ? 'text-primary font-bold' : ''
                    }`}
                    onClick={() => navigateTo('/dashboard')}
                >
                    Dashboard
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        path === '/dashboard/questions' ? 'text-primary font-bold' : ''
                    }`}
                    onClick={() => navigateTo('/dashboard/questions')}
                >
                    Questions
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''
                    }`}
                    onClick={() => navigateTo('/dashboard/upgrade')}
                >
                    Upgrade
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        path === '/dashboard/howitworks' ? 'text-primary font-bold' : ''
                    }`}
                    onClick={() => navigateTo('/dashboard/howitworks')}
                >
                    How it Works?
                </li>
                <li
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                        path === '/dashboard/contactme' ? 'text-primary font-bold' : ''
                    }`}
                    onClick={() => navigateTo('/dashboard/contactme')}
                >
                    Contact Me
                </li>
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;
