import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/services/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Call the external Express backend
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      throw new Error(data.message || 'Authentication failed');
    }

    const { token, role, email, name, _id } = data;

    const response = NextResponse.json({ 
      success: true, 
      user: { id: _id, email, role, name },
      token,
      redirectUrl: `/${role.toLowerCase() === 'admin' ? 'admin' : role.toLowerCase()}`
    });

    // Set high-security cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 401 });
  }
}
