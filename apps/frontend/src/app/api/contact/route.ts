import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function resolveStrapiBaseUrl() {
  let configuredBaseUrl = process.env.STRAPI_API_URL || process.env.STRAPI_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!configuredBaseUrl || configuredBaseUrl.trim() === '') {
    return 'https://api.calebadjeoda.dev';
  }

  configuredBaseUrl = configuredBaseUrl.trim();
  if (!configuredBaseUrl.match(/^https?:\/\//i)) {
    configuredBaseUrl = `https://${configuredBaseUrl}`;
  }

  if (configuredBaseUrl.includes('localhost') || configuredBaseUrl.includes('127.0.0.1')) {
    return 'https://api.calebadjeoda.dev';
  }

  return configuredBaseUrl.replace(/\/api\/?$/, '');
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

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50000);

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
      return NextResponse.json(
        {
          error: {
            message: 'The message service is taking longer than expected. Your message may still have been received.',
          },
        },
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
