"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarDays, ArrowRight, ChevronLeft, ChevronRight, FileSearch } from "lucide-react"
import { BlogPost } from "@/lib/blogs"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input"
import { CiSearch } from "react-icons/ci";
import { getAllBlogData } from "@/app/(home)/_actions/action"
import { RiLoader4Fill } from "react-icons/ri"

const POSTS_PER_PAGE = 20

const MixCat = () => {





  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {

    async function getData() {
      let data = await getAllBlogData();
      setAllBlogs(data);
    }

    getData();

  }, []);


  const [first, setfirst] = useState("All Categories");
  const [input, setInput] = useState("");

  let filteredBlogs = allBlogs;
  if (first === "Music") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Music");
  } else if (first === "Photography") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Photography");
  } else if (first === "Technology") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Technology");
  } else if (first === "Lifestyle") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Lifestyle");
  } else if (first === "Nature") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Nature");
  } else if (first === "Games") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Games");
  } else if (first === "Business") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Business");
  } else if (first === "Health") {
    filteredBlogs = allBlogs.filter((post) => post.category === "Health");
  } else {
    filteredBlogs = allBlogs
  }


  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE)

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const selectedPosts = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className="w-full mx-auto p-3 mt-4 z-20 bg-white">
      <div className="flex flex-col items-center justify-center gap-2 mb-6 p-4  w-full rounded-md bg-white ">
        <h2 className="text-xl sm:text-2xl font-bold oswald tracking-tight">
          All Blog Posts
        </h2>
        <p className="text-sm text-gray-500 text-center dm_sans max-w-3xl">
          Browse our latest blog articles covering a variety of topics — from cutting-edge tech innovations and immersive gaming adventures, to mindful lifestyle tips and nature explorations. Whether you're into business trends, photography insights, music stories, or wellness advice — there's something here for everyone.
        </p>
        <p className="text-sm text-gray-500 text-center dm_sans max-w-3xl">
          All posts are curated to keep you informed, inspired, and engaged — updated regularly with fresh perspectives and deep dives from passionate creators.
        </p>
      </div>



      <div className="flex flex-col md:flex-row md:justify-between gap-4 border w-full rounded-2xl p-4 items-start md:items-center mb-6">
        {/* Category Buttons & Select */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full md:w-auto">
          {["Technology", "Gaming", "Lifestyle"].map((category) => (
            <button
              onClick={() => setfirst(category)}
              key={category}
              className={`px-4 py-2 text-sm oswald cursor-pointer font-medium rounded-full border transition-all duration-200 ${category === first
                ? "bg-orange-600 text-white"
                : "text-orange-600 bg-orange-100 border-orange-200 hover:bg-orange-200 hover:text-orange-700"
                }`}
            >
              {category}
            </button>
          ))}

          <Select onValueChange={(value) => setfirst(value)}>
            <SelectTrigger className="w-[180px] oswald font-sans text-orange-600">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="oswald text-orange-500">
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
                <SelectItem value="Games">Games</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-[300px]">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 transform text-orange-500 text-lg" />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by title"
            className="pl-10 pr-4 h-10 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 dm_sans"
          />
        </div>
      </div>



      {
        selectedPosts.length > 0 ? (
          <div className="grid gap-4">
            {selectedPosts
              .filter(post => post.title.toLowerCase().includes(input.toLowerCase()))
              .map((post, i) => (
                <div
                  key={i}
                  className="flex flex-col hover:border-dashed hover:border-orange-500 justify-start max-h-[250px] md:max-h-[180px] border md:flex-row items-start gap-6 bg-white rounded overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="md:w-1/4 md:h-1/1 relative aspect-video md:aspect-square">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={true}
                    />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-4 md:p-0 md:py-4">
                    <Badge variant="outline" className="font-sans bg-black text-white mb-2">
                      {post.category}
                    </Badge>
                    <Link href={post.link}>
                      <h2 className="text-md oswald md:text-lg font-bold leading-tight mb-1 font-sans hover:text-orange-500">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3 dm_sans">
                      {post.description}
                    </p>
                    <div className="flex items-center text-gray-500 mb-1 font-sans text-xs">
                      <span className="font-bold uppercase mr-1">BY</span> {post.author.name}
                      <CalendarDays className="w-3 h-3 ml-4 mr-1" />
                      {post.date}
                    </div>
                    <Button
                      className="font-sans mt-2 group hover:bg-orange-600 bg-orange-500 text-white rounded-none hover:text-white shadow-2xl"
                      variant="outline"
                      asChild
                    >
                      <Link href={post.link}>
                        Read more
                        <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-2 duration-200 transition-all" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="my-6 flex justify-center items-center">
            <RiLoader4Fill className="animate-spin text-2xl text-orange-500" />
          </div>
        )
      }


      {/* Pagination Controls */}
      <div className="flex items-center  justify-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="font-sans cursor-pointer"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={cn("w-9 h-9 px-0 font-sans cursor-pointer", currentPage === page && "bg-orange-500 hover:bg-orange-600 text-white ")}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="font-sans cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default MixCat
