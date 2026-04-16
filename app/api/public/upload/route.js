import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = file.name.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    
    // Path: public/uploads/docs/
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'docs');
    const path = join(uploadDir, filename);

    await writeFile(path, buffer);
    
    // Return the relative URL for the DB
    const relativeUrl = `/uploads/docs/${filename}`;

    return NextResponse.json({ success: true, url: relativeUrl });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
