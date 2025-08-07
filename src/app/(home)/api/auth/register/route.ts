import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";

let URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const profileImage = formData.get("profileImage") as File;

    console.log("Received data:", { name, email, password, profileImage });

    // Convert File to Buffer
    const arrayBuffer = await profileImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("role", "user");
    form.append("profileImage", buffer, {
      filename: profileImage.name,
      contentType: profileImage.type,
    });

    const response = await axios.post(`${URI}/api/auth/register`, form, {
      headers: {
        ...form.getHeaders(), // Important!
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token);

    return NextResponse.json({
      message: response.data.message,
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Registration failed",
        success: false,
      },
      { status: 400 }
    );
  }
}
