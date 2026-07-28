import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NODE_ENV === 'development' 
  ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337' 
  : 'https://api.calebadjeoda.dev';

export async function POST(request: NextRequest) {
  try {
    const { blogId } = await request.json();

    if (!blogId) {
      return NextResponse.json(
        { error: 'blogId is required' },
        { status: 400 }
      );
    }

    // Fetch the current blog to get the current likes count
    const fetchRes = await fetch(`${API_URL}/api/blogs/${blogId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!fetchRes.ok) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    const fetchData = await fetchRes.json();
    const currentLikes = fetchData.data?.attributes?.likes || fetchData.data?.likes || 0;

    // Increment the likes count via Strapi API
    const updateRes = await fetch(`${API_URL}/api/blogs/${blogId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { likes: currentLikes + 1 },
      }),
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      console.error('Strapi update error:', errorData);
      return NextResponse.json(
        { error: 'Failed to update likes' },
        { status: 500 }
      );
    }

    const updatedData = await updateRes.json();
    const newLikes = updatedData.data?.attributes?.likes || updatedData.data?.likes || currentLikes + 1;

    return NextResponse.json({ likes: newLikes });
  } catch (error) {
    console.error('Like API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
