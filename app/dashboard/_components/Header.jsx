"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {

    const path = usePathname();
    useEffect(()=>{
         console.log(path);
    }, [])
  return (
    <div className='flex p-4 items-center justify-between bg-gray-200 shadow-sm'>
        <img src={'/logo.svg'} alt='logo' width={30} height={10} />

        <ul className='hidden md:flex gap-5 '>
            <li className={`hover:text-blue-600 hover:font-bold transition-all  cursor-pointer
            ${path == '/dashboard' &&'text-blue-600 font-bold' }`}>Dashboard</li>
            <li className={`hover:text-blue-600 hover:font-bold transition-all  cursor-pointer
            ${path == '/question' &&'text-blue-600 font-bold' }`}>Questions</li>
            <li className={`hover:text-blue-600 hover:font-bold transition-all  cursor-pointer
            ${path == '/upgrade' &&'text-blue-600 font-bold' }`}>Upgrade</li>
            <li className={`hover:text-blue-600 hover:font-bold transition-all  cursor-pointer
            ${path == '/howWork' &&'text-blue-600 font-bold' }`}>How it Works</li>
        </ul>

        <UserButton /> 
    </div>
  )
}

export default Header