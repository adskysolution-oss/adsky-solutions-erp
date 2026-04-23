import { NextResponse } from 'next/server';
import { loginUserWithMongoose } from '@/lib/services/mongoose-auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    let userData;

    // 1. Check if external backend is configured
    if (process.env.NEXT_PUBLIC_BACKEND_URL && process.env.NEXT_PUBLIC_BACKEND_URL !== 'undefined') {
      try {
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (backendRes.ok) {
          const data = await backendRes.json();
          userData = {
            id: data._id,
            email: data.email,
            role: data.role,
            name: data.name,
            token: data.token
          };
        }
      } catch (err) {
        console.warn('External backend failed, falling back to local auth:', err.message);
      }
    }

    // 2. Fallback to local MongoDB Auth if Backend failed or not set
    if (!userData) {
      const { user, token } = await loginUserWithMongoose(email, password);
      userData = {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        token
      };
    }

    const { id, role, name, token } = userData;

    const response = NextResponse.json({ 
      success: true, 
      user: { id, email: userData.email, role, name },
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
