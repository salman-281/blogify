"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log("response......", response.data.message);
      if (response.data.message) {
        toast.success(response.data.message || "Login successful!");
       window.location.href = "/";
      }else{
        toast.success(response.data.message.message || "Login Failed!");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex min-h-screen items-center font-sans justify-center  bg-white px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md  border-none bg-transparent shadow-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-[50px] rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-[50px] rounded-full"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer h-[50px] mt-5 rounded-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex justify-center items-center gap-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="underline hover:text-primary">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page