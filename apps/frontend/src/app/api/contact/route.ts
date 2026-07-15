import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = body?.data ?? body;

    const baseUrl =
      process.env.STRAPI_API_URL ||
      process.env.STRAPI_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'https://portfolio-pwfp.onrender.com';

    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    });

    const text = await response.text();
    let data: any = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error?.message || 'Unable to send message.' } },
      { status: 500 }
    );
  }
}
