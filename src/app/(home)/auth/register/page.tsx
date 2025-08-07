"use client"

import type React from "react"
import {  useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getAllUser } from "../../_actions/action"

export interface Mail {
  _id: string;
  email: string;
}




const page = () => {


    const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  console.log("allUsers:", allUsers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!inputs.name || !inputs.email || !inputs.password) {
      toast.error("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (allUsers.includes(inputs.email)) {
      toast.error("Email already exists.");
      setIsLoading(false);
      return;
    }

  

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful! You can now log in.");
        router.push("/auth/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An unexpected error occurred.";
        toast.error(`Registration failed: ${errorMessage}`);
      } else {
        toast.error("Network error or server is unreachable. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        const emails = res.users.map((user: Mail) => user.email);
        setAllUsers(emails);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailExists = allUsers.includes(value);
      if (emailExists) {
        setError("Email already exists.");
      } else {
        setError("");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, or GIF).");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB.");
        return;
      }

      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };



 
  return (
    <div className="flex min-h-screen font-sans items-center justify-center bg-white px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md bg-transparent border-none shadow-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Register</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Image Section */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Picture (Optional)</Label>
              <div className="flex flex-col items-center space-y-3">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className="h-[50px] rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={inputs.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="h-[50px] rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email{error ?  <span className="text-red-500">*</span> : <></>}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={inputs.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className={`h-[50px] rounded-full ${error ? "border-red-500 border " : ""}`}
              />
            </div>
            {
              error
              &&
              <p className="text-red-500 text-xs">{error}</p>
            }
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                 className="h-[50px] rounded-full"
              />
            </div>
            <Button type="submit" className="w-full mt-4 cursor-pointer h-[50px] rounded-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex justify-center gap-2 items-center w-full text-sm text-muted-foreground">
          Already have an account?{" "}{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
             Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page