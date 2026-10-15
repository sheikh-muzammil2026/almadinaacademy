import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const SERVER_BASE =
  process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:5000";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id || session.user._id;
    const email = session.user.email;

    // Fetch live user permissions and role from backend Express server
    const targetUrl = `${SERVER_BASE}/api/user/me?email=${encodeURIComponent(
      email
    )}&id=${encodeURIComponent(userId)}`;

    const res = await fetch(targetUrl, {
      headers: {
        "x-user-email": email,
        "x-user-id": String(userId),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // Fallback to session user if server endpoint is temporarily unreachable
    return NextResponse.json({
      success: true,
      user: {
        id: String(userId),
        name: session.user.name || "User",
        email: session.user.email || "",
        image: session.user.image || "",
        role: (session.user.role || "student").toLowerCase(),
        permissions: session.user.permissions || [],
        isBanned: Boolean(session.user.isBanned),
        status: session.user.isBanned ? "banned" : "active",
      },
    });
  } catch (error) {
    console.error("GET /api/user/me error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
