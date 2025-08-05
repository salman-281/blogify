"use client"
import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "/dashboard",
      items: [
         {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "Add Blog",
          url: "/dashboard/add_blog",
        },
        {
          title: "Blog Posts",
          url: "/dashboard/blog_list",
        },
        {
          title: "Newsletter",
          url: "/dashboard/newsletter",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState("");

  const handleItemClick = (url: string) => {
    setActiveItem(url);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b">
        <button className="w-full cursor-pointer h-[48px] "> {/* Use a button or anchor when using asChild */}
          <div className="flex items-center justify-start p-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <span className="text-md outfit3 ml-2 font-sans font-bold">Salman Shahid</span>
          </div>
        </button>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label font-sans text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          className={`${activeItem === subItem.url ? "!bg-gray-900 !text-white" : ""}`}
                          asChild
                          isActive={activeItem === subItem.url}
                        >
                          <Link
                            href={subItem.url}
                            onClick={() => handleItemClick(subItem.url)}
                            className="font-sans"
                          >
                            {subItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}