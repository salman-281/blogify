



"use client"
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowRightAlt } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection = () => {



  let heroStyle = [
    {
      id: 1,
      title: "Gaming",
      subtitle: "The Future of Interactive Entertainment",
      image: "https://images.pexels.com/photos/2323435/pexels-photo-2323435.jpeg",
      link: "/blog/category/gaming",
      description: "Explore how next-gen technology is transforming the way we play, connect, and compete in the digital universe."
    },
    {
      id: 2,
      title: "Technology",
      subtitle: "Innovations Shaping Tomorrow",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      link: "/blog/category/technology",
      description: "From AI breakthroughs to gadget reviews, explore how technology is transforming everyday life and powering the digital age."
    },
    {
      id: 3,
      title: "Health",
      subtitle: "Wellness in a Fast-Paced World",
      image: "https://images.pexels.com/photos/342361/pexels-photo-342361.jpeg",
      link: "/blog/category/health",
      description: "Discover the latest trends in health and wellness, from fitness tips to mental health strategies, for a balanced lifestyle."
    },
    {
      id: 4,
      title: "Business",
      subtitle: "Strategies for the Modern Entrepreneur",
      image: "https://images.pexels.com/photos/7681415/pexels-photo-7681415.jpeg",
      link: "/blog/category/business",
      description: "From startup successes to business insights, explore how entrepreneurs navigate the challenges and opportunities of the modern business world."
    },
    {
      id: 5,
      title: "Nature",
      subtitle: "Earth's Silent Wonders",
      image: "https://images.pexels.com/photos/2747231/pexels-photo-2747231.jpeg",
      link: "/blog/category/nature",
      description: "Reconnect with nature’s serenity—from lush forests to ocean depths—and why protecting them matters."
    },
    {
      id: 6,
      title: "Photography",
      subtitle: "Capturing Life's Moments",
      image: "https://images.pexels.com/photos/248519/pexels-photo-248519.jpeg",
      link: "/blog/category/photography",
      description: "From stunning landscapes to vibrant portraits, explore the world of photography and how it can capture moments that last a lifetime."
    },
    {
      id: 7,
      title: "Music",
      subtitle: "The Soundtrack of Our Lives",
      image: "https://images.pexels.com/photos/30767625/pexels-photo-30767625.jpeg",
      link: "/blog/category/music",
      description: "Explore the rhythms and melodies that define our lives, from iconic albums to emerging artists."
    }
  ]




  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-4 gap-4 w-full px-4 md:px-10 py-6">

        {/* Swiper Carousel */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 row-span-2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-xl h-full"
          >
            {heroStyle.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="h-[400px] p-6 rounded-xl text-white flex flex-col justify-end bg-black/40 select-none cursor-pointer"
                >
                  <h1 className="text-2xl font-bold oswald">{item.title}</h1>
                  <h2 className="text-xs font-semibold mb-2 font-sans">{item.subtitle}</h2>
                  <p className="text-sm mb-4 dm_sans">{item.description}</p>
                  <Link href={item.link}>
                    <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-xs py-1.5 px-3 w-max rounded-full dm_sans">Read Article</button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Box 2 */}
        <div className="col-span-1 row-span-2 bg-cover bg-center rounded-xl p-6 text-white flex flex-col justify-end bg-black/40 hover:translate-x-2 transition-all duration-300"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg')" }}>
          <div className='w-full bg-black/40 p-4 rounded-lg'>
            <h1 className="text-2xl font-bold oswald">Technology</h1>
            <h2 className="text-xs font-semibold mb-2 font-sans">Innovations Shaping Tomorrow</h2>
            <Link href='/blog/category/technology'><button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-xs py-1.5 px-3 rounded-full dm_sans">Read Article</button></Link>
          </div>
        </div>

        {/* Box 3 */}
        <div className="col-span-1 row-span-2 bg-cover bg-center rounded-xl p-6 text-white flex flex-col justify-end bg-black/40 hover:translate-x-2 transition-all duration-300"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/342361/pexels-photo-342361.jpeg')" }}>
          <div className='w-full bg-black/40 p-4 rounded-lg'>
            <h1 className="text-2xl font-bold oswald">Health</h1>
            <h2 className="text-xs font-semibold mb-2 font-sans">Wellness in a Fast-Paced World</h2>
            <Link href='/blog/category/health'><button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-xs py-1.5 px-3 rounded-full dm_sans">Read Article</button></Link>
          </div>
        </div>

        {/* Box 4 */}
        <div className="col-span-1 row-span-2 bg-cover bg-center rounded-xl p-6 text-white flex flex-col justify-end bg-black/40 hover:translate-x-2 transition-all duration-300"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg')" }}>
          <div className='w-full bg-black/40 p-4 rounded-lg'>
            <h1 className="text-2xl font-bold oswald">Lifestyle</h1>
            <h2 className="text-sm font-semibold mb-2 font-sans">Minimal Living, Maximum Impact</h2>
            <Link href='/blog/category/lifestyle'><button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-xs py-1.5 px-3 rounded-full dm_sans">Read Article</button></Link>
          </div>
        </div>

        {/* Box 5 */}
        <div className="col-span-1 row-span-2 bg-cover bg-center rounded-xl p-6 text-white flex flex-col justify-end bg-black/40 hover:translate-x-2 transition-all duration-300"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/7681415/pexels-photo-7681415.jpeg')" }}>
          <div className='w-full bg-black/40 p-4 rounded-lg'>
            <h1 className="text-2xl font-bold oswald">Business</h1>
            <h2 className="text-sm font-semibold mb-2 font-sans">Strategies for the Modern Entrepreneur</h2>
            <Link href='/blog/category/business'><button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-xs py-1.5 px-3 rounded-full dm_sans">Read Article</button></Link>
          </div>
        </div>

        {/* Box 6 */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 row-span-2 bg-cover bg-center rounded-xl p-6 text-white flex flex-col justify-end bg-black/40 hover:translate-y-2 transition-all duration-300"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/2747231/pexels-photo-2747231.jpeg')" }}>
          <h1 className="text-2xl font-bold oswald">Nature</h1>
          <h2 className="text-xs font-semibold mb-2 font-sans">Earth's Silent Wonders</h2>
          <p className="text-sm mb-4 dm_sans">Reconnect with nature’s serenity—from lush forests to ocean depths—and why protecting them matters.</p>
          <Link href='/blog/category/nature'><button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-xs py-1.5 px-3 rounded-full dm_sans">Read Article</button></Link>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <Link href="/all-blogs">
          <button className="flex justify-center items-center gap-2 text-sm font-sans bg-orange-500 cursor-pointer h-[40px] px-14  group text-white  font-bold "><span>Browse All</span> <MdOutlineArrowRightAlt className="group-hover:translate-x-2 transition-all duration-300 text-xl" /></button>
        </Link>
      </div>


    </div>
  )
}

export default HeroSection