import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

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
        Accept: 'application/json',
      },
      body: JSON.stringify({ data: payload }),
      signal: controller.signal,
      cache: 'no-store',
      keepalive: true,
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
    if (error?.name === 'AbortError') {
      return NextResponse.json(
        { error: { message: 'The message service is temporarily slow. Please try again in a moment.' } },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: { message: error?.message || 'Unable to send message.' } },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
