"use client"
import { Card, CardContent } from '@/components/ui/card'
import { BlogPost, BusinessData, PhotographyData } from '@/lib/blogs'
import Image from 'next/image'
import Link from 'next/link'
import  { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { LuMoveRight } from 'react-icons/lu'
import { RiShareForwardLine } from 'react-icons/ri'
import { TbMessage2 } from 'react-icons/tb'

const page = () => {

  const [photography, setPhotography] = useState<BlogPost[]>([]);

  useEffect(() => {
    const photographyDataFun = async () => {
      let data = await PhotographyData;
      setPhotography(data);
    }
    photographyDataFun();
  }, []);


  return (
    <div>
          <section className="w-full max-w-7xl mx-auto mt-4 p-3 dark:bg-gray-900">
      <div className="container ">
        <div className="flex flex-col items-center justify-center  text-center">
         <div className="flex justify-center flex-col items-center p-2 gap-4 w-full">
  <h2 className="text-lg font-bold oswald tracking-tighter sm:text-2xl">Photography Focus</h2>
  <p className="text-sm dm_sans text-gray-500 text-center">
    Capturing the world, one frame at a time.
  </p>
  <h3 className="text-md font-semibold oswald text-center sm:text-lg">
    Behind the Lens
  </h3>
  <p className="text-sm dm_sans text-gray-500 text-center max-w-xl">
    Explore visual storytelling through tips, techniques, and showcases that celebrate the art and soul of photography.
  </p>
</div>
        </div>
        <div className="mx-auto grid max-w-7xl items-start gap-6 py-5 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
          {
          photography.map((post, i) => (
          <Link href={post.slug} key={i}>
                <Card
                  className="group overflow-hidden hover:translate-y-2 transition-all duration-300 hover:border hover:border-dashed shadow-2xl hover:border-orange-500 h-[460px] rounded-xs py-2 px-2"
                >

                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded"
                    />
                    <CardContent className="grid gap-3 px-2">
                      <h3 className="text-xl font-bold  leading-tight group-hover:underline oswald"><span>{post.title.slice(0, 40)}...</span></h3>
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
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default page