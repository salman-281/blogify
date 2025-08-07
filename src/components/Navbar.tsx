"use client"
import { Search, ChevronDown } from "lucide-react"
import { FaArrowRight, FaBlog } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { FaArrowRightToBracket, FaCircleUser } from "react-icons/fa6"
import { GoPencil } from "react-icons/go"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BlogDialog } from "./blog-dialog"
import { motion } from "framer-motion"
import { IoReaderSharp } from "react-icons/io5";
import { RiFeedbackFill } from "react-icons/ri"
const categories = [
    "Business",
    "Health",
    "Games",
    "Lifestyle",
    "Music",
    "Nature",
    "Photography",
    "Technology",
]


export interface UserData {
    success?: boolean;
    user?: {
        name?: string;
        email?: string;
        role?: string;
        image?: string;
    };
    
}

export interface NavbarProps {
    userData?: UserData;
}



const Navbar = ({ userData }: NavbarProps) => {

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    console.log("userData in Navbar:", userData);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false); // scrolling down
            } else {
                setShowNavbar(true); // scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);










    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-white ${showNavbar ? "translate-y-0" : "-translate-y-full"
                } z-50 border-b border-gray-100`}>
                <Link href='/'>
                    <div className="flex justify-center py-3 min-[540px]:hidden items-center gap-2 font-sans font-bold text-gray-800 cursor-pointer text-xl">
                        <FaBlog className="w-6 h-6 text-gray-700" />
                        <span>Blogify</span>
                    </div>
                </Link>
                <div className="max-w-full relative mx-auto px-6 py-3 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href='/'>
                        <div className="hidden items-center min-[540px]:flex  gap-2 font-sans font-bold text-gray-800 cursor-pointer text-xl">
                            <FaBlog className="w-6 h-6 text-gray-700" />
                            <span>Blogify</span>
                        </div>
                    </Link>
                    {/* Navigation Links */}
                    <div className=" font-sans hidden xl:flex items-center space-x-1 text-sm">
                        {categories.slice(0, 4).map((cat) => (
                            <Link
                                key={cat}
                                href={`/blog/category/${cat.toLowerCase()}`}
                                className="text-gray-800 text-md hover:bg-gray-100 px-4 flex justify-center items-center h-[35px] rounded-md w-[80px] py-2 cursor-pointer  hover:text-gray-900 transition-all font-medium"
                            >
                                <span>{cat}</span>
                            </Link>
                        ))}
                    </div>



                    <div className=" font-sans flex items-center space-x-1 text-sm">
                        <Button
                            onClick={() => setIsOpen(!isOpen)}
                            variant="ghost"
                            className="flex cursor-pointer items-center  text-gray-600 hover:text-gray-900 transition-all h-auto px-0 py-1.5 font-medium"
                        >
                            <span className="text-[15px]">Categories</span>
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                            transition={{ duration: 0.3 }}
                            onMouseLeave={() => setIsOpen(false)}
                            onClick={() => setIsOpen(false)}
                            className={`absolute z-50 ${isOpen ? "block" : "hidden"} border   top-[110%] rounded-xl left-0 w-full bg-white shadow-xl  transition-all duration-300`}
                        >
                            <div className="max-h-[500px] overflow-y-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                <Link href='/blog/category/business'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/7876046/pexels-photo-7876046.jpeg" alt="Business" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Business</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/health'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg" alt="Health" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Health</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/games'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/21067/pexels-photo.jpg" alt="Learn" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Games</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/lifestyle'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg" alt="Lifestyle" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Lifestyle</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/music'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" alt="Music" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Music</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/nature'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg" alt="Nature" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Nature</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/photography'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/3600/man-camera-taking-photo-photographer.jpg" alt="Photography" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Photography</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                                <Link href='/blog/category/technology'>
                                    <div className="flex flex-col items-center justify-center text-center border cursor-pointer group border-gray-500 border-dashed hover:border-orange-600 transition-all duration-200 rounded-xl py-5 px-5">
                                        <Image src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg" alt="Technology" width={200} height={200} className="rounded-md mb-2 group-hover:opacity-80" />
                                        <span className="text-sm font-medium  flex justify-evenly items-center w-full"><button className=" text-gray-700 group-hover:text-gray-800 group-hover:underline decoration-orange-500" ><span className="group-hover:text-blue-500">#</span> Technology</button><FaArrowRight className="group-hover:translate-x-2 group-hover:text-blue-500 text-gray-600 transition-all duration-300" /></span>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>

                    </div>

                    <BlogDialog />

                    {/* Actions */}
                    <div className="flex items-center font-sans space-x-4">


                        {
                            (userData && userData.user?.role === "admin")
                                ?
                                <>
                                    <Button className="px-5 py-2 bg-orange-500 cursor-pointer text-white rounded-full hover:bg-orange-600 transition-all text-sm font-medium">
                                        <Link className="flex justify-center items-center gap-1" href='/dashboard'> <span>Dashboard</span><FaArrowRightToBracket /></Link>
                                    </Button>

                                    <Button className="px-5 py-2 hidden sm:flex bg-gray-800 cursor-pointer text-white rounded-full hover:bg-gray-900 transition-all text-sm font-medium">
                                        <span>Write a Post</span><GoPencil />
                                    </Button>
                                </>
                                :
                                <>
                                {
                                    userData?.user?.role === "user" ?
                                    <>
                                    <h1 className="oswald text-lg">{userData?.user?.name}</h1>
                                    </>
                                    :
                                    <Button className="px-5 py-2 bg-gray-800 cursor-pointer text-white rounded-full hover:bg-gray-800 transition-all text-sm font-medium">
                                    <Link className="flex justify-center items-center gap-3" href='/auth/login'> <span>Login</span><FaArrowRightToBracket /></Link>
                                </Button>
                                }
                                <Button className="px-5 py-2 bg-orange-500 cursor-pointer text-white rounded-full hover:bg-orange-600 transition-all text-sm font-medium">
                                    <Link className="flex justify-center items-center gap-2" href='/all-blogs'> <span>Read a Post</span><IoReaderSharp />
                                    </Link>
                                </Button>
                                </>


                        }

                        <FaCircleUser className="text-3xl hidden text-gray-600 cursor-pointer transition-all" />

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
