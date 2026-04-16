import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/services/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { user, token } = await loginUser(email, password);

    const response = NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token,
      redirectUrl: `/${user.role}`
    });

    // Set high-security cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
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
