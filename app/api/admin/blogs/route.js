import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import BlogPost from '@/models/BlogPost';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
    }

    let post;
    if (data._id) {
      post = await BlogPost.findByIdAndUpdate(data._id, data, { new: true });
    } else {
      post = await BlogPost.create(data);
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
