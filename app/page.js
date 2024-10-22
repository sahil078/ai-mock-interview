"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import SignUp from './(auth)/sign-up/[[...sign-up]]/page'; // Correct default import
import SignIn from './(auth)/sign-in/[[...sign-in]]/page'; // Correct default import
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isSignedIn } = useUser(); // Get user's authentication status
  const [redirecting, setRedirecting] = useState(false); // State for redirecting

  useEffect(() => {
    // If the user is signed in, set redirecting to true
    if (isSignedIn) {
      setRedirecting(true);
    }
  }, [isSignedIn]); // Re-run when isSignedIn changes

  return (
    <div className='min-h-full w-auto flex items-center justify-center'>
      {redirecting ? (
        <div className='flex flex-col items-center justify-center gap-10 p-10 my-5 border rounded-lg shadow-md bg-gray-200'>
          <p>You are signed in! Redirecting...</p>
          {/* Link to dashboard */}
          <Link href="/dashboard">
            <Button className="btn">Go to Dashboard</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center gap-10'>
            <SignIn /> {/* Show SignIn if user is not signed in */}
          </div>
        </>
      )}
    </div>
  );
}
