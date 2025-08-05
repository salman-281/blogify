import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const URI = process.env.NEXT_PUBLIC_BACKEND_URI || "http://localhost:5000";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        console.log("email.....", email, "password.......", password);

        const response = await axios.post(`${URI}/api/auth/login`, { email, password });

        // Set token cookie
        const cookieStore = await cookies();
        cookieStore.set("token", response.data.token);

        console.log("response...............", response.data);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.log("error.........", error.response?.data);
        return NextResponse.json({ message: error.response?.data });
    }
}
