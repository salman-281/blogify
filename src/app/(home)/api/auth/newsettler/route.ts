import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    const cookieStore = await cookies(); // no need to await this
    const token = cookieStore.get("token")?.value;

    const response = await axios.post(
      `${URI}/api/auth/newsletter-email`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    return NextResponse.json(
      { message, success: false },
      { status: error.response?.status || 500 }
    );
  }
}
