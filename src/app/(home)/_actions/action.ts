"use server"
import axios from "axios"
import { cookies } from 'next/headers'



let URI = process.env.NEXT_PUBLIC_BACKEND_URI || "";

export const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await axios.get(`${URI}/api/auth/get-user`, {
            headers: { Authorization: `Bearer ${token}`, withCredentials: true },
        });
        return response.data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}






export const getAllUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await axios.get(`${URI}/api/auth/get-all-users`, {
            headers: { Authorization: `Bearer ${token}`, withCredentials: true },
        });
        return response.data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}


export const getUserForDashboard = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await axios.get(`${URI}/api/auth/get-users-for-admin`, {
            headers: { Authorization: `Bearer ${token}`, withCredentials: true },
        });
        return response.data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}


export const getNewsletterEmails = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    try {
        const response = await axios.get(`${URI}/api/auth/get-newsletter-email`, {
            headers: { Authorization: `Bearer ${token}`, withCredentials: true },
        });
        return response.data;
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}
  

// lib/getUserBlogs.ts

export const getAllBlogData = async () => {
    try {
        const response = await axios.get(`${URI}/api/auth/mydata`);
        return response.data.data || [];
    } catch (error: any) {
        return error?.response?.data?.message || "Failed to fetch user";
    }
}




