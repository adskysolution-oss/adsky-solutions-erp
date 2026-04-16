import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'adsky-25x-master-secret-2026';

/**
 * AdSky 25X RBAC Middleware Utility
 * Enforces role-based access control for API routes.
 */
export async function authorize(req, allowedRoles = []) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      throw new Error('Forbidden: Insufficient permissions');
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
