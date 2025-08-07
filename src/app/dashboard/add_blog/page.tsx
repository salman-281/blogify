'use client'

    import { useState } from 'react'
    import { Button } from "@/components/ui/button"
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Textarea } from "@/components/ui/textarea"
    import { Switch } from "@/components/ui/switch"
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    import axios from 'axios'

    export default function BlogPostForm() {
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [imageUrl, setImageUrl] = useState('')
      const [favourite, setFavourite] = useState(false)
      const [popular, setPopular] = useState(false)
      const [isFeatured, setIsFeatured] = useState(false)
      const [markdownContent, setMarkdownContent] = useState('')
      const [tags, setTags] = useState('')
      const [category, setCategory] = useState('') // New state for category
      const [errors, setErrors] = useState<{ [key: string]: string }>({})

      const categories = [
        'Technology',
        'Nature',
        'Photography',
        'Music',
        'Lifestyle',
        'Health',
        'Business',
        'Gaming',
      ]

      const validate = () => {
        const newErrors: { [key: string]: string } = {}
        if (!title.trim()) {
          newErrors.title = 'Title is required.'
        }
        if (!description.trim()) {
          newErrors.description = 'Description is required.'
        }
        if (!markdownContent.trim()) {
          newErrors.markdownContent = 'Markdown content is required.'
        }
        // Category is not required based on the prompt, but could be added here if needed
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
          const formData = {
            title,
            description,
            imageUrl,
            favourite,
            popular,
            isFeatured,
            markdownContent,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            category, // Add category to form data
          }

          console.log("Form data to be sent:", formData)
          try {
            let response = await axios.post(`/api/auth/create-blogs`, formData);
            console.log("Blog post created successfully:", response.data);
            // Optionally clear form or show success message
            setTitle('');
            setDescription('');
            setImageUrl('');
            setFavourite(false);
            setPopular(false);
            setIsFeatured(false);
            setMarkdownContent('');
            setTags('');
            setCategory('');
            setErrors({});
          } catch (error) {
            console.error("Error creating blog post:", error);
            setErrors({ submit: "Failed to create blog post. Please try again." });
          }
        } else {
          console.log('Validation failed. Please check the form.')
        }
      }

      return (
        <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-5xl shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-sans">Create New Blog Post</CardTitle>
              <CardDescription className="dm_sans">Fill out the details below to publish a new blog entry.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="title">Title</Label>
                  <Input
                    className="dm_sans"
                    id="title"
                    placeholder="Enter blog post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of the post"
                    className="min-h-[80px] dm_sans"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="imageUrl">Image URL</Label>
                  <Input
                    className="dm_sans"
                    id="imageUrl"
                    type="url"
                    placeholder="e.g., https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                {/* New Category Select Option */}
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="category">Category</Label>
                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger  id="category" className="dm_sans w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* End New Category Select Option */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="favourite"
                      checked={favourite}
                      onCheckedChange={setFavourite}
                    />
                    <Label className="font-sans" htmlFor="favourite">Favourite</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={popular}
                      onCheckedChange={setPopular}
                    />
                    <Label className="font-sans" htmlFor="popular">Popular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={isFeatured}
                      onCheckedChange={setIsFeatured}
                    />
                    <Label className="font-sans" htmlFor="isFeatured">Featured</Label>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="markdownContent">Markdown Content</Label>
                  <Textarea
                    id="markdownContent"
                    placeholder="Write your blog post content in Markdown"
                    className="min-h-[200px] dm_sans"
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                    required
                  />
                  {errors.markdownContent && <p className="text-red-500 text-sm mt-1">{errors.markdownContent}</p>}
                </div>
                <div className="grid gap-2">
                  <Label className="font-sans" htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., technology, web development, AI (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end mt-5">
                <Button type="submit" className="font-sans cursor-pointer">Publish Post</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )
    }
