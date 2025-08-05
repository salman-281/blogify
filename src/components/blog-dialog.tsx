"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from "lucide-react" // Importing an icon for the trigger button
import PopupCategory from "./popup-category"
import { useState } from "react"

export function BlogDialog() {

const [popup, setPopup] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    onClick={() => setPopup(!popup)}
                    className=" items-center gap-2 hidden md:flex cursor-pointer px-3 w-[180px] py-2 border border-gray-300 hover:border-dotted rounded-full bg-white text-sm text-gray-500  shadow-sm hover:border-orange-500 "
                >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className=" font-sans">Search</span>
                    <kbd className="ml-auto dm_sans hidden sm:flex items-center px-1.5 py-0.5 text-[10px] font-medium text-gray-500  bg-gray-100 border border-gray-200 rounded">
                        Ctrl K
                    </kbd>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] p-0">
                {" "}
                {/* Increased max-width and set height */}
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold oswald">Explore Our Blog Categories</DialogTitle>
                    <DialogDescription className="dm_sans">
                        Discover articles across various topics. Use the search bar to find your favorite blogs.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    {" "}
                    {/* Added flex-1 and overflow-hidden to manage content height */}
                    <PopupCategory />
                </div>
            </DialogContent>
        </Dialog>
    )
}
