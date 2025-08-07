import { getUser } from "@/app/(home)/_actions/action";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export async function POST(request: NextRequest) {
  try {

    const blogData = await request.json();
    let userData = await getUser();


    console.log("User Data:..........", userData.name);


  

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;


    // Send blog data to your backend API
    console.log("Sending blog data to backend API", URI);
    const response = await axios.post(
      `${URI}/api/auth/create/blogs`, // Adjust endpoint if needed
      {
        ...blogData,
        //slug: blogData.title.toLowerCase().replace(/ /g, "-"),
        slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), // Slugify title
        author: {
          name: userData.name, // Replace with actual author name
          image: userData.profileImage, // Replace with actual author image URL
        },
        date: new Date().toISOString(), // Current date in ISO format
        readTime: '5 min read', // Example read time, you can calculate this based on content length
        likes: 0, // Initial likes count
        shares: 0, // Initial shares count
        views: 0, // Initial views count
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
