"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userData = urlParams.get('user');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        
        // Verify state parameter for CSRF protection
        const storedState = sessionStorage.getItem('oauth_state');
        
        if (state !== storedState) {
          throw new Error('Invalid state parameter - possible CSRF attack');
        }

        // Clear the state from session storage
        sessionStorage.removeItem('oauth_state');

        if (error) {
          throw new Error(error);
        }

        if (!token || !userData) {
          throw new Error('Authentication failed - missing token or user data');
        }

        try {
          // Store tokens and user data
          localStorage.setItem('token', token);
          
          // Parse user data
          const parsedUser = JSON.parse(decodeURIComponent(userData));
          localStorage.setItem('userData', JSON.stringify(parsedUser));
          
          if (parsedUser.id) {
            localStorage.setItem('customerId', parsedUser.id);
          }

          // Redirect to profile page
          router.push('/profile');
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          throw new Error('Failed to process user data');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push(`/login?error=${encodeURIComponent(error.message || 'authentication_error')}`);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <p>Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
}