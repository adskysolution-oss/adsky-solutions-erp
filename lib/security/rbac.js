import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adsky-25x-master-secret-2026';

/**
 * AdSky RBAC Middleware Utility
 * Enforces role-based access control for API routes.
 */
export async function authorize(allowedRoles = []) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Case-insensitive role check
    const userRole = decoded.role?.toLowerCase();
    const allowed = allowedRoles.map(r => r.toLowerCase());

    if (allowed.length > 0 && !allowed.includes(userRole)) {
      throw new Error(`Forbidden: Access Denied. Admin Elevation Required.`);
    }

    return { 
      success: true, 
      user: decoded 
    };

  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

export function rbacResponse(error, status = 403) {
  return NextResponse.json({ 
    success: false, 
    error 
  }, { status });
}

