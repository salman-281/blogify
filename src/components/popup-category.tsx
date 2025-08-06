"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { BlogCard } from "@/components/blog-card"
import {  BlogPost } from "@/lib/blogs"
import { getAllBlogData } from "@/app/(home)/_actions/action"


export default function PopupCategory() {

   const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
          
              useEffect(() => {
          
                  async function getData() {
                      let data = await getAllBlogData();
                      setAllBlogs(data);
                  }
          
                  getData();
          
              }, []);
  
  const [searchTerm, setSearchTerm] = useState("")

 const categories = useMemo(() => {
  const uniqueCategories = Array.from(new Set(allBlogs.map((post) => post.category)))
  return uniqueCategories.sort()
}, [allBlogs])


  const filteredPosts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return allBlogs.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.category.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [searchTerm])

 const groupedPosts = useMemo(() => {
  return categories.reduce(
    (acc, category) => {
      acc[category] = filteredPosts.filter((post) => post.category === category)
      return acc
    },
    {} as Record<string, BlogPost[]>,
  )
}, [categories, filteredPosts])



  return (
    <div className="p-4 w-full">
      {" "}
      {/* Removed max-w and mx-auto, added basic padding */}
      <div className="mb-6">
        {" "}
        {/* Adjusted margin-bottom */}
        <Input
          type="search"
          placeholder="Search Your Favorite Blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full dm_sans" // Removed max-w-md and mx-auto, dialog will handle overall width
        />
      </div>


      {
        searchTerm.length === 0 ? (
          <div className="text-center min-h-[200px]">
            <div className="flex justify-center items-center flex-col space-y-2 mt-20">
              <h2 className="text-lg font-bold text-gray-500 oswald">Search for your favorite blogs...</h2>
              <p className="text-sm text-gray-400 dm_sans">Type in the search bar above</p>
            </div>
          </div>
        )
          :
          <div className=" max-h-[370px] py-10  overflow-y-auto w-full rounded-md border px-4">
            {
              filteredPosts.length === 0 ?
                <>
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-500 oswald">No results found</h2>
                    <p className="text-sm text-gray-400 dm_sans">Try adjusting your search terms</p>
                  </div>
                </>
                :
                <>
                  <div className="grid gap-8 lg:grid-cols-1 ">
                    {" "}
                    {/* Adjusted grid columns for dialog size */}
                    {categories.map((category, i) => {
                      const postsInCategory = groupedPosts[category];
                      if (postsInCategory.length === 0) {
                        return null // Don't render category if no posts match search
                      }
                      return (
                        <div key={i} className="space-y-4 w-full flex justify-start items-start flex-col">
                          <h2 className="text-xl font-bold  text-foreground ml-2 dm_sans">{category}</h2>{" "}
                          {/* Changed h1 to h2 for semantic hierarchy */}
                          <ul className="space-y-2 w-full  gap-2 flex flex-col ">
                            {postsInCategory.map((post, index) => (
                              <li key={index} className="">
                                <BlogCard {...post} />
                              </li>
                            ))}
                          </ul>



                        </div>
                      )
                    })}
                  </div>
                </>
            }
          </div>
      }

    </div>
  )
}
