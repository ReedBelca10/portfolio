import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function resolveStrapiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  }
  return 'https://api.calebadjeoda.dev';
}

function normalizePayload(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return body;
  }

  const candidate = body as Record<string, unknown>;

  if ('data' in candidate && candidate.data && typeof candidate.data === 'object' && !Array.isArray(candidate.data)) {
    return candidate.data;
  }

  return candidate;
}

function buildAcceptedResponse(message: string) {
  return NextResponse.json(
    {
      success: true,
      message,
      data: { message },
    },
    { status: 202 }
  );
}

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const rawBody = await request.text();
    let parsedBody: unknown = {};

    if (rawBody) {
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        parsedBody = { raw: rawBody };
      }
    }

    const payload = normalizePayload(parsedBody);
    const baseUrl = resolveStrapiBaseUrl();

    const response = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ data: payload }),
      signal: controller.signal,
      cache: 'no-store',
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
      return buildAcceptedResponse(
        'Your message has been received and is being processed. It may take a moment to appear in the inbox.'
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
