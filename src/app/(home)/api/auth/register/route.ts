import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


let URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function POST(request: NextRequest) {


  try {
    const { name, email, password } = await request.json();

    console.log("Received data:", { name, email, password });


    const response = await axios.post(`${URI}/api/auth/register`, {
      name,
      email,
      password,
      role: "user", // Default role
    });

    const cookieStore = await cookies();
    cookieStore.set('token', response.data.token);
    return NextResponse.json({
      message: response.data.message,
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Registration failed",
        success: false,
      },
      { status: 400 }
    );
  }
}
