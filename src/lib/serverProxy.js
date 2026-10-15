import { NextResponse } from "next/server";

const SERVER_BASE =
  process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:5000";

/**
 * Cleanly forwards a Next.js API request to the backend Express server
 * Keeps headers, query parameters, method, and request body intact.
 *
 * @param {Request} request Next.js API request
 * @param {string} serverPath Path on backend server, e.g. "/api/faculty"
 * @returns {Promise<Response>}
 */
export async function forwardToServer(request, serverPath) {
  try {
    const url = new URL(request.url);
    const targetUrl = `${SERVER_BASE}${serverPath}${url.search}`;

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Exclude hop-by-hop headers
      if (
        key !== "host" &&
        key !== "content-length" &&
        key !== "transfer-encoding"
      ) {
        headers.set(key, value);
      }
    });

    const options = {
      method: request.method,
      headers,
      cache: "no-store",
    };

    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const bodyText = await request.text();
        if (bodyText) {
          options.body = bodyText;
        }
      }
    }

    const response = await fetch(targetUrl, options);
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": contentType },
      });
    }
  } catch (error) {
    console.error(`Forwarding to server error for ${serverPath}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "ব্যাকএন্ড সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।",
        error: error.message,
      },
      { status: 502 }
    );
  }
}
