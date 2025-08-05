import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function POST(request: NextRequest) {
  try {

    const blogData = await request.json();

    console.log("Received blog data:.............", blogData);

    // Validation (optional: you can enhance this)
    if (!blogData.title || !blogData.slug || !blogData.content) {
      return NextResponse.json(
        { message: "Missing required blog fields", success: false },
        { status: 400 }
      );
    }

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Send blog data to your backend API
    const response = await axios.post(
      `${URI}/api/auth/create/blogs`, // Adjust endpoint if needed
      blogData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("terminal logs", response.data);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    const message = error?.response?.data?.message || "Something went wrong";
    const status = error?.response?.status || 500;

    return NextResponse.json(
      { message, success: false },
      { status }
    );
  }
}
