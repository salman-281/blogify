'use client'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mountain, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { FaBlog } from "react-icons/fa"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

export default function SiteFooter() {



  const [input, setinput] = useState("");
  const [loading, setloading] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    setloading(true);

    try {
      const response = await axios.post("/api/auth/newsettler", {
        email: input,
      });

      const { data, status } = response;

      if (data.success) {
        toast.success(data.message || "Successfully subscribed to newsletter.");
      } else {
        toast.error("Newsletter registration failed.");
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Something went wrong. Please try again.";

      toast.error(`Newsletter registration failed: ${errorMessage}`);
    } finally {
      setloading(false);
      setinput("");
    }
  };





  return (
    <footer className="border-t font-sans border-primary/20 bg-background py-12">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-6">
        <div className="space-y-2">
          <Link href='/'>
            <div className="flex justify-start py-1 items-start gap-2 font-sans font-bold text-gray-800 cursor-pointer text-2xl">
              <FaBlog className="w-6 h-6 text-gray-700" />
              <span>Blogify</span>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your daily dose of gaming news, reviews, and esports buzz. Level up with us!
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-all" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-all" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-all" aria-label="Youtube">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
          <nav className="grid gap-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-all">
              Home
            </Link>
            <Link href="/all-blogs" className="text-sm text-muted-foreground hover:text-primary transition-all">
              Categories
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-all">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-all">
              Contact
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Categories</h3>
          <nav className="grid gap-2">
            <Link
              href="/blog/category/business"
              className="text-sm text-muted-foreground hover:text-primary transition-all"
            >
              Business
            </Link>
            <Link href="/blog/category/lifestyle" className="text-sm text-muted-foreground hover:text-primary transition-all">
              Lifestyle
            </Link>
            <Link
              href="/blog/category/music"
              className="text-sm text-muted-foreground hover:text-primary transition-all"
            >
              Music
            </Link>
            <Link
              href="/blog/category/games"
              className="text-sm text-muted-foreground hover:text-primary transition-all"
            >
              Games
            </Link>
          </nav>
        </div>
        <div className="space-y-4 lg:col-span-1 md:col-span-3">
          <h3 className="text-lg font-semibold text-foreground">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest gaming news and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-muted border-muted-foreground/30 focus-visible:ring-primary"
            />
            <Button disabled={loading} type="submit" className="px-6 cursor-pointer font-sans py-2 text-sm bg-orange-500 hover:bg-orange-600 oswald font-medium">
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
      <div className="container mt-8 text-center text-sm text-muted-foreground px-4 md:px-6">
        &copy; {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  )
}
