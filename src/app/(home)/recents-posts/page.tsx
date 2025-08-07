"use client"
import { BlogPost } from '@/lib/blogs'
import  { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import BlogSidebar from '@/components/blog-sidebar'
import { RiShareForwardLine } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'
import { TbMessage2 } from 'react-icons/tb'
import { LuMoveRight } from 'react-icons/lu'
import { getAllBlogData } from '../_actions/action'

const POSTS_PER_PAGE = 10; // Show 6 posts per page

const page = () => {


      const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
      
          useEffect(() => {
      
              async function getData() {
                  let data = await getAllBlogData();
                  setAllBlogs(data);
              }
      
              getData();
      
          }, []);

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const filRecent = allBlogs
        .filter((item) => new Date(item.date) >= oneWeekAgo) // Filter blogs from last 7 days
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filRecent.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filRecent.length / POSTS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className='w-full max-w-7xl mx-auto p-4'>
                <div className="flex flex-col items-center justify-center  text-center">
                    <div className="flex flex-col justify-center items-center p-4 w-full">
                        <h2 className="text-lg font-bold oswald sm:text-2xl">
                            Recent Posts
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-xl">
                            Explore the most recent posts from the last week, featuring trending topics, insightful articles, and fresh perspectives across various categories.
                        </p>
                    </div>

                </div>

                <div className='flex justify-start w-full items-start flex-wrap md:flex-nowrap'>
                    <section className="mt-4 p-3 grid grid-cols-1 z-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            currentPosts.map((post, i) => (
                                <Link href={post.slug} key={i}>
                                    <Card
                                        className="hover:translate-y-2 transition-all duration-300 hover:border-dashed shadow-2xl hover:border-orange-500 h-[430px] rounded-xs py-2 px-2"
                                    >

                                        <Image
                                            src={post.imageUrl || "/placeholder.svg"}
                                            alt={post.title}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                        <CardContent className="grid gap-3 my-3 px-2">
                                            <h3 className="text-xl font-bold leading-tight group-hover:underline oswald">{post.title.slice(0, 40)}...</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm dm_sans ">{post.description.slice(0, 160)}...</p>
                                            <span className='flex justify-start items-start gap-2 text-sm font-sans text-gray-600'>{post.date.slice(0, 9)}</span>
                                            <div className="flex justify-between mt-3  w-full items-center font-sans">
                                                <button className='flex justify-center cursor-pointer  items-center group gap-2 text-sm text-orange-500 dm_sans'><span>Read More</span><LuMoveRight className='group-hover:translate-x-2 transition-all duration-300' /></button>
                                                <div className='flex justify-center items-center gap-4 text-lg '>
                                                    <RiShareForwardLine className='hover:text-yellow-600 text-gray-500' /><AiOutlineLike className='hover:text-yellow-600 text-gray-500' /><TbMessage2 className='hover:text-yellow-600 text-gray-500' />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        }
                    </section>
                    <span className='w-1/3 sticky top-10'>
                        <BlogSidebar allBlogs={filRecent} />
                    </span>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center dm_sans items-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1) }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handlePageChange(index + 1) }}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1) }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default page
