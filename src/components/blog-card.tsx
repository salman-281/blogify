import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPost } from "@/lib/blogs"
import Link from "next/link"
import { FaPenAlt } from "react-icons/fa"
import { Badge } from "./ui/badge"



export function BlogCard({ id, title, date, description, author, commentsCount, tags, popular, shares, readTime, likes, isFeatured, favorite, imageUrl, slug, category, markdownContent }: BlogPost) {
 

  return (
    <Card className="w-full h-full rounded border hover:border-orange-500 hover:border-dashed">
      <CardHeader className="pb-2">
        <span className="text-sm text-muted-foreground font-medium font-sans">#{id}</span>
        <CardTitle className="text-lg font-semibold text-foreground leading-tight">
          <Link href={slug} className="hover:underline font-sans oswald hover:text-orange-500">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground dm_sans">{date}</CardDescription>
        <p className="text-sm text-muted-foreground dm_sans mt-1 flex"><FaPenAlt className="mr-2" /><span>{author.name}</span></p>
        <p className="text-sm text-muted-foreground dm_sans mt-1">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
      </CardHeader>
    </Card>
  )
}
