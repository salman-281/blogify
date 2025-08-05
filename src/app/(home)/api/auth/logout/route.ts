import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const cookieStore = await cookies();
    cookieStore.delete('token');
    
    return NextResponse.json({ message: 'Logout successful', success: true }, { status: 200 });
}