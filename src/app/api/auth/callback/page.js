// app/auth/callback/page.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Extract token from URL (e.g., ?token=abc123)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (token) {
      // Store token in localStorage/cookies
      localStorage.setItem('auth_token', token);
      router.push('/profile'); // Redirect to profile/dashboard
    } else {
      router.push('/login?error=no_token');
    }
  }, []);

  return <div>Processing login...</div>;
}