import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function GET(request: NextRequest) {
  try {
    // ✅ FIX: cookies() is NOT async
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token found." },
        { status: 401 }
      );
    }

    // ✅ Make request to backend API
    const response = await axios.get(`${URI}/api/auth/user/blogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Blogs response", response.data)
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);

    const message =
      error?.response?.data?.message || "Failed to fetch blog posts.";
    const status = error?.response?.status || 500;

    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}
