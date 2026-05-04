import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('States API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}
