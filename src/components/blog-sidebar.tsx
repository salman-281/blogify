import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { FaCalendarDays } from "react-icons/fa6"
import { BlogPost, BusinessData, GamesData, HealthData, LifestyleData, MusicData, NatureData, PhotographyData, TechnologyData } from "@/lib/blogs"



import { useEffect, useState } from "react";

export default function BlogSidebar({allBlogs}: {allBlogs: BlogPost[]}) {
  const [categories, setCategories] = useState<
    { name: string; count: number; link: string }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const business = await BusinessData;
      const photography = await PhotographyData;
      const technology = await TechnologyData;
      const music = await MusicData;
      const lifestyle = await LifestyleData;
      const nature = await NatureData;
      const games = await GamesData;
      const health = await HealthData;

      setCategories([
        { name: "Business", count: business.length, link: "/blog/category/business" },
        { name: "Photography", count: photography.length, link: "/blog/category/photography" },
        { name: "Technology", count: technology.length, link: "/blog/category/technology" },
        { name: "Music", count: music.length, link: "/blog/category/music" },
        { name: "Lifestyle", count: lifestyle.length, link: "/blog/category/lifestyle" },
        { name: "Nature", count: nature.length, link: "/blog/category/nature" },
        { name: "Games", count: games.length, link: "/blog/category/games" },
        { name: "Health", count: health.length, link: "/blog/category/health" },
      ]);
    }
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white space-y-8 p-4">
      {/* Tags Section */}
      <div className="space-y-4">
        <div className="border-b py-3 text-center text-lg font-semibold uppercase font-sans tracking-wider">Tags</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((tag, i) => (
            <Link key={i} href={tag.slug}>
              <Button
                variant="outline"
                className="rounded-full px-3 py-1 dm_sans cursor-pointer text-xs font-normal hover:bg-orange-500  shadow-lg hover:text-white bg-transparent"
              >
                {tag.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="border-y py-3 text-center text-lg font-semibold font-sans uppercase tracking-wider">Categories</div>
        <div className="grid gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug}
              className="flex items-center justify-between py-2  dm_sans text-base text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
            >
              <div className="flex items-center hover:text-orange-500 gap-2">
                <ChevronRight className="h-4 w-4  text-gray-500 dark:text-gray-400" />
                <span>{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">({category.count})</span>
            </Link>
          ))}
        </div>
      </div>


      <div className="hidden flex-col min-[1115px]:flex justify-between items-center gap-3 mt-4 lg:mt-0">
        <div className="border-y w-full h-[100px] py-3 text-center text-lg font-semibold font-sans uppercase tracking-wider">Recents Posts</div>

        {
          allBlogs
          .slice(0, 5)
            .map((item, i) => {
              return (
                <Link key={i} href={item.slug}>
                  <div className="flex flex-col sm:flex-row hover:bg-gray-100 justify-start gap-4 items-center border p-2 cursor-pointer w-full">
                    <div className="w-full  overflow-hidden  sm:w-[250px]">
                      <Image className="rounded w-full h-auto"
                       src={item.imageUrl} 
                       alt="music" width={400} height={300} />
                      
                    </div>
                    <div className="w-full">
                      <button className="text-blue-500 font-sans font-bold">{item.category}</button>
                      <h1 className="font-serif">{item.description}</h1>
                      <span className="flex justify-start items-center text-sm gap-2 dm_sans">
                        <FaCalendarDays />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })
        }
      </div>
     
    </div>
  )
}
