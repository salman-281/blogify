"use client";

import Link from "next/link";
import { MdHome } from "react-icons/md";
import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { LuFilter } from "react-icons/lu";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { NavbarProps } from "./Navbar";
import { AiOutlineLogout } from "react-icons/ai";
type Checked = DropdownMenuCheckboxItemProps["checked"]
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";

const SmallNavbar = ({ userData }: NavbarProps) => {


  const [loading, setLoading] = useState(false) // Changed from true to false since this seems to be for logout loading
  const router = useRouter();

  const handleCategoryChange = (value: string) => {
    router.push(`/${value.toLowerCase()}`);
  };



  const handleLogout = async () => {
    try {
      setLoading(true)
      let response = await axios.post("/api/auth/logout");
      toast.error("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className="w-full sticky z-40 top-0 flex justify-between px-10 items-center left-0 mt-16.5 bg-white shadow-sm py-2 font-sans">
      <ul className="flex gap-6 text-sm text-gray-700">
        <li className="flex items-center gap-1 cursor-pointer transition">
          <MdHome className="text-lg" />
          <Link href="/">Home</Link>
        </li>
      <li className=" items-center gap-1 hidden md:flex   cursor-pointer transition">
          <Link href="/contact">Contact Us</Link>
        </li>
        <li className=" items-center gap-1 hidden lg:flex   cursor-pointer transition">
          <Link href="/about">About</Link>
        </li>
        <li className=" items-center gap-1 hidden sm:flex  cursor-pointer transition">
          <Link href="/all-blogs">All Blogs</Link>
        </li>
        <li>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px] oswald font-sans text-orange-600">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="oswald text-orange-500">
                <SelectLabel>Categories</SelectLabel>
                <SelectItem className="cursor-pointer" value="favourite-posts">Favourite Posts</SelectItem>
                <SelectItem className="cursor-pointer" value="featured-posts">Featured Posts</SelectItem>
                <SelectItem className="cursor-pointer" value="popular-posts">Popular Posts</SelectItem>
                <SelectItem className="cursor-pointer" value="recents-posts">Recents Posts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </li>


      </ul>
      <ul className=" hidden md:flex justify-center items-center gap-5">
        <li className="hover:text-blue-600 text-2xl cursor-pointer"><FaFacebook /></li>
        <li className="hover:text-black text-2xl cursor-pointer"><FaXTwitter /></li>
        <li className="hover:text-red-500 text-2xl cursor-pointer"><IoLogoYoutube /></li>
        <li className="hover:text-pink-700 text-2xl cursor-pointer"><FaInstagram /></li>
        {
          userData?.user?.email
            ?
            <>
              <li className="hover:text-red-500 text-orange-500 text-2xl cursor-pointer">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <AiOutlineLogout className="rotate-270" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-sans">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="dm_sans">
                        This action cannot be undone. This will permanently logout your
                        account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="font-sans">
                      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="hover:bg-red-600 cursor-pointer bg-red-500 text-white">Logout</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            </>
            :
            <></>
        }
      </ul>
    </nav>
  );
};

export default SmallNavbar;
