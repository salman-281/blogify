"use server"
import axios from "axios"
import { cookies } from 'next/headers'



let URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await fetch(`${URI}/api/auth/get-user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include", // This enables cookie-based auth
        });

        let data = await response.json();
        return data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}






export const getAllUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await fetch(`${URI}/api/auth/get-all-users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include", // Sends cookies with the request (if needed)
        });

        const data = await response.json(); // Don't forget to parse the response

        return data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}


export const getUserForDashboard = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await fetch(`${URI}/api/auth/get-users-for-admin`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include", // if your server expects cookies
        });

        const data = await response.json();
        return data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}


export const getNewsletterEmails = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await fetch(`${URI}/api/auth/get-newsletter-email`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include", // Only needed if the API uses cookies
        });

        const data = await response.json();
        return data;

    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}


// lib/getUserBlogs.ts

export const getAllBlogData = async () => {
    try {
        const response = await fetch(`${URI}/api/auth/mydata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result.data || [];

    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}




