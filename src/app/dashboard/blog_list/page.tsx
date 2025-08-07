"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaCalendarDays, FaShare } from "react-icons/fa6"
import { MdAccessTime, MdEdit } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"
import { IoIosLink } from "react-icons/io"
import { Button } from "@/components/ui/button"
import { RiDeleteBinLine, RiLoader4Fill } from "react-icons/ri"
import { BlogPost } from "@/lib/blogs"
import { getAllBlogData } from "@/app/(home)/_actions/action"

const POSTS_PER_PAGE = 10 // Show 5 posts per page for better table readability

const Page = () => {


  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
        
            useEffect(() => {
        
                async function getData() {
                    let data = await getAllBlogData();
                    setAllBlogs(data);
                }
        
                getData();
        
            }, []);

            
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = allBlogs.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-start items-start p-5 w-full">
        <h2 className="text-2xl font-bold tracking-tighter font-sans ">All Blogs</h2>
      </div>

      <div className=" border overflow-x-auto font-sans">
        <Table>
          <TableHeader>
            <TableRow className="font-bold bg-gray-100 font-sans">
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="min-w-[120px] hidden sm:table-cell">Category</TableHead>
              <TableHead className="min-w-[150px] hidden md:table-cell">Author</TableHead>
              <TableHead className="min-w-[150px] hidden lg:table-cell">Date</TableHead>
              <TableHead className="min-w-[100px] text-center hidden lg:table-cell">Read Time</TableHead>
              <TableHead className="min-w-[100px] text-center hidden lg:table-cell">Likes</TableHead>
              <TableHead className="min-w-[100px] text-center hidden lg:table-cell">Shares</TableHead>
              <TableHead className="text-right min-w-[150px] flex justify-center items-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 w-5xl flex justify-center items-center ">
                   <RiLoader4Fill className="animate-spin text-center text-2xl text-orange-500" />
                </TableCell>
              </TableRow>
            ) : (
              currentPosts.map((post) => (
                <TableRow key={post.title}>
                  <TableCell className="font-medium">
                    <Link href={post.slug} className="hover:underline font-semibold text-gray-800">
                      {post.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2 sm:hidden">
                      {post.tags.map((tag, i) => (
                        <Badge variant="secondary" key={i} className="text-xs">
                          # {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge>{post.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {/* You might want to use an actual Image component for author.image if it's a URL */}
                      {/* <Image src={post.author.image || "/placeholder.svg"} alt={post.author.name} width={24} height={24} className="rounded-full" /> */}
                      <span>{post.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FaCalendarDays className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <MdAccessTime className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <AiOutlineLike className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <FaShare className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={post.slug}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
                      >
                        <IoIosLink className="h-4 w-4 mr-1" /> View
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 cursor-pointer w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      >
                        <MdEdit className="h-4 w-4" />
                        <span className="sr-only">Edit user</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 cursor-pointer hover:bg-red-50 hover:text-red-600"
                      >
                        <RiDeleteBinLine className="h-4 w-4" />
                        <span className="sr-only">Delete user</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 font-sans flex justify-center items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(index + 1)
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Page
