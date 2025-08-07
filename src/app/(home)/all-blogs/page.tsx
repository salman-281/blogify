"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import Link from "next/link"

const blogCategories = [
  {
    category: "Business",
    title: "Top 10 Business Strategies That Will Dominate in 2025",
    imageUrl: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
    link: "/blog/category/business",
  },
  {
    category: "Health",
    title: "The Ultimate Guide to Building a Healthier Lifestyle This Year",
    imageUrl: "https://images.pexels.com/photos/342361/pexels-photo-342361.jpeg",
    link: "/blog/category/health",
  },
  {
    category: "Games",
    title: "Next-Gen Gaming: Trends, Tech, and Titles You Can’t Miss",
    imageUrl: "https://images.pexels.com/photos/3405456/pexels-photo-3405456.jpeg",
    link: "/blog/category/games",
  },
  {
    category: "Lifestyle",
    title: "Minimalism to Mindfulness: The Lifestyle Trends Shaping the Future",
    imageUrl: "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
  },
  {
    category: "Music",
    title: "How AI and Streaming Are Changing the Music Industry Forever",
    imageUrl: "https://images.pexels.com/photos/30767625/pexels-photo-30767625.jpeg",
    link: "/blog/category/music",
  },
  {
    category: "Nature",
    title: "Why Connecting with Nature Is the Key to Modern Wellbeing",
    imageUrl: "https://images.pexels.com/photos/1467989/pexels-photo-1467989.png",
    link: "/blog/category/nature",
  },
  {
    category: "Photography",
    title: "From Click to Masterpiece: 15 Pro Photography Tips for Stunning Shots",
    imageUrl: "https://images.pexels.com/photos/248519/pexels-photo-248519.jpeg",
    link: "/blog/category/photography",
  },
  {
    category: "Technology",
    title: "Future Tech 2025: Innovations That Will Redefine Our World",
    imageUrl: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    link: "/blog/category/technology",
  },
]

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight oswald lg:text-5xl">
          Explore Our Top Blog Highlights
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto dm_sans">
          Dive into handpicked articles across gaming, technology, lifestyle, and more — crafted to inform, inspire, and ignite your curiosity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogCategories.map((blog, index) => (
          <Card
            style={{ backgroundImage: `url(${blog.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            key={index}
            className="flex flex-col overflow-hidden p-3   shadow-2xl  transition-shadow duration-300"
          >
            <CardHeader className="bg-white bg-opacity-80 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm font-medium  uppercase tracking-wider text-bold oswald text-white">{blog.category}</p>
              <CardTitle className="text-xl font-semibold leading-tight mt-1 text-white dm_sans">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">{/* Additional content can go here if needed */}</CardContent>
            <CardFooter className="m-0">
              <Link className="w-full" href={blog.slug || '/'}> <Button className="bg-orange-500 hover:bg-orange-600 py-1 px-1 rounded-full text-xs cursor-pointer flex dm_sans justify-center items-center gap-1 group"><span>Read Articles</span> <FaArrowRight className="group-hover:translate-x-8 transition-all duration-300 text-xs" /></Button></Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
