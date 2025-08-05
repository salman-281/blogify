"use client"
import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Collapsible } from "@/components/ui/collapsible"

// Helper function to slugify text
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
}

interface Tag {
  id: string
  name: string
  slug: string
}

export default function BlogPostForm() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")

  // Author Section
  const [authorName, setAuthorName] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState("")
  const [authorBio, setAuthorBio] = useState("")

  // Category Section
  const [categoryName, setCategoryName] = useState<
    "Industry Analysis" | "Game Reviews" | "News" | "Tutorials" | "Opinion"
  >("News")
  const [categoryId, setCategoryId] = useState("")
  const [categorySlug, setCategorySlug] = useState("")

  // Tags Section
  const [tags, setTags] = useState<Tag[]>([])
  const [currentTagInput, setCurrentTagInput] = useState("")

  // Media
  const [featuredImageUrl, setFeaturedImageUrl] = useState("")

  // Publication Details
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16))
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString().slice(0, 16))
  const [readingTimeMinutes, setReadingTimeMinutes] = useState(5)
  const [featured, setFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  // SEO Details
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")

  // Engagement
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)

  // Collapsible states
  const [basicInfoOpen, setBasicInfoOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(false)
  const [authorOpen, setAuthorOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [tagsOpen, setTagsOpen] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [publicationOpen, setPublicationOpen] = useState(false)
  const [seoOpen, setSeoOpen] = useState(false)
  const [engagementOpen, setEngagementOpen] = useState(false)

  // Auto-generate slug from title
  useEffect(() => {
    setSlug(slugify(title))
  }, [title])

  // Auto-generate category slug from category name
  useEffect(() => {
    setCategorySlug(slugify(categoryName))
  }, [categoryName])

  // Update current time for 'Updated At' field
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedAt(new Date().toISOString().slice(0, 16))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAddTag = () => {
    if (currentTagInput.trim() !== "") {
      const newTag: Tag = {
        id: Date.now().toString(), // Simple unique ID
        name: currentTagInput.trim(),
        slug: slugify(currentTagInput.trim()),
      }
      setTags([...tags, newTag])
      setCurrentTagInput("")
    }
  }

  const handleRemoveTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!title || !slug || !excerpt || !content || !authorName || !publishedAt || !seoTitle || !seoDescription) {
      toast.error("Please fill in all required fields.")
      return
    }

    const formData = {
      title,
      slug,
      excerpt,
      content,
      author: {
        id: authorId,
        name: authorName,
        avatar: authorAvatarUrl,
        bio: authorBio,
      },
      category: {
        id: categoryId,
        name: categoryName,
        slug: categorySlug,
      },
      tags,
      featuredImage: featuredImageUrl,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
      readingTime: readingTimeMinutes,
      featured,
      isPublished,
      views,
      likes,
      seoTitle,
      seoDescription,
    }

    console.log("Submitting form data:", JSON.stringify(formData, null, 2)) // Log the structured data

    try {
      const response = await fetch("/api/auth/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast.success("Blog post created successfully!")
        // Reset form fields
        setTitle("")
        setSlug("")
        setExcerpt("")
        setContent("")
        setAuthorName("")
        setAuthorId("")
        setAuthorAvatarUrl("")
        setAuthorBio("")
        setCategoryName("News")
        setCategoryId("")
        setCategorySlug("")
        setTags([])
        setCurrentTagInput("")
        setFeaturedImageUrl("")
        setPublishedAt(new Date().toISOString().slice(0, 16))
        setReadingTimeMinutes(5)
        setFeatured(false)
        setIsPublished(false)
        setSeoTitle("")
        setSeoDescription("")
        setViews(0)
        setLikes(0)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to create blog post.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("An unexpected error occurred.")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 font-sans md:px-6">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Blog Post</CardTitle>
          <CardDescription>Fill out the form to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <Collapsible title="Basic Info" open={basicInfoOpen} onOpenChange={setBasicInfoOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Your amazing blog post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="auto-generated-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="A short summary of your blog post"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                />
              </div>
            </Collapsible>

            {/* Content */}
            <Collapsible title="Content" open={contentOpen} onOpenChange={setContentOpen}>
              <div className="space-y-2">
                <Label htmlFor="content">Blog Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your blog post content here..."
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </Collapsible>

            {/* Author Section */}
            <Collapsible title="Author Section" open={authorOpen} onOpenChange={setAuthorOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    placeholder="John Doe"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorId">Author ID</Label>
                  <Input
                    id="authorId"
                    placeholder="e.g., user-123"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="authorAvatarUrl">Author Avatar URL</Label>
                <Input
                  id="authorAvatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  value={authorAvatarUrl}
                  onChange={(e) => setAuthorAvatarUrl(e.target.value)}
                />
                {authorAvatarUrl && isValidUrl(authorAvatarUrl) && (
                  <div className="mt-2">
                    <Image
                      src={authorAvatarUrl || "/placeholder.svg"}
                      alt="Author Avatar Preview"
                      width={100}
                      height={100}
                      className="rounded-full object-cover aspect-square"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="authorBio">Author Bio</Label>
                <Textarea
                  id="authorBio"
                  placeholder="A short bio about the author"
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                />
              </div>
            </Collapsible>

            {/* Category Section */}
            <Collapsible title="Category Section" open={categoryOpen} onOpenChange={setCategoryOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Select value={categoryName} onValueChange={(value) => setCategoryName(value as any)}>
                    <SelectTrigger id="categoryName">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Industry Analysis">Industry Analysis</SelectItem>
                      <SelectItem value="Game Reviews">Game Reviews</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Tutorials">Tutorials</SelectItem>
                      <SelectItem value="Opinion">Opinion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category ID</Label>
                  <Input
                    id="categoryId"
                    placeholder="e.g., cat-tech"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="categorySlug">Category Slug</Label>
                <Input
                  id="categorySlug"
                  placeholder="auto-generated-category-slug"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                />
              </div>
            </Collapsible>

            {/* Tags Section */}
            <Collapsible title="Tags Section" open={tagsOpen} onOpenChange={setTagsOpen}>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag"
                    value={currentTagInput}
                    onChange={(e) => setCurrentTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                      {tag.name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => handleRemoveTag(tag.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove tag</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </Collapsible>

            {/* Media */}
            <Collapsible title="Media" open={mediaOpen} onOpenChange={setMediaOpen}>
              <div className="space-y-2">
                <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
                <Input
                  id="featuredImageUrl"
                  placeholder="https://example.com/featured.jpg"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                />
                {featuredImageUrl && isValidUrl(featuredImageUrl) && (
                  <div className="mt-2">
                    <Image
                      src={featuredImageUrl || "/placeholder.svg"}
                      alt="Featured Image Preview"
                      width={200}
                      height={150}
                      className="rounded-md object-cover aspect-[4/3]"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=200"
                      }}
                    />
                  </div>
                )}
              </div>
            </Collapsible>

            {/* Publication Details */}
            <Collapsible
              title="Publication Details"
              open={publicationOpen}
              onOpenChange={setPublicationOpen}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Published At</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Updated At</Label>
                  <Input id="updatedAt" type="datetime-local" value={updatedAt} disabled />
                </div>
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="readingTimeMinutes">Reading Time (minutes)</Label>
                <Input
                  id="readingTimeMinutes"
                  type="number"
                  placeholder="e.g., 5"
                  value={readingTimeMinutes}
                  onChange={(e) => setReadingTimeMinutes(Number.parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Featured Post</Label>
                    <p className="text-[0.8rem] text-muted-foreground">Mark this post as featured on the homepage.</p>
                  </div>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Is Published</Label>
                    <p className="text-[0.8rem] text-muted-foreground">Set the publication status of the post.</p>
                  </div>
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
              </div>
            </Collapsible>

            {/* SEO Details */}
            <Collapsible title="SEO Details" open={seoOpen} onOpenChange={setSeoOpen}>
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  placeholder="Optimized title for search engines"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 mt-5">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="Meta description for search engines"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  required
                />
              </div>
            </Collapsible>

            {/* Engagement */}
            <Collapsible
              title="Engagement (Optional)"
              open={engagementOpen}
              onOpenChange={setEngagementOpen}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="views">Views</Label>
                  <Input
                    id="views"
                    type="number"
                    placeholder="0"
                    value={views}
                    onChange={(e) => setViews(Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes">Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    placeholder="0"
                    value={likes}
                    onChange={(e) => setLikes(Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </Collapsible>

            <Button type="submit" className="w-full">
              Create Blog Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
