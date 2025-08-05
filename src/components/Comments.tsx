"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface Comment {
  id: number
  name: string
  avatar: string
  text: string
  timestamp: Date
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
    text: "Great article! Learned a lot from this post.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/placeholder-user.jpg",
    text: "Thanks for sharing such valuable insights.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
]

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handlePostComment = () => {
    if (newComment.trim() === "") return

    const newEntry: Comment = {
      id: Date.now(),
      name: "Guest User",
      avatar: "/placeholder-user.jpg",
      text: newComment,
      timestamp: new Date(),
    }

    setComments([newEntry, ...comments])
    setNewComment("")
  }

  return (
    <div className="max-w-full font-sans mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Comments</h2>

      {/* Comment Input */}
      <Card className="mb-8 shadow rounded-lg">
        <CardContent className="flex items-start gap-4 p-6">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="Current User" />
            <AvatarFallback>GU</AvatarFallback>
          </Avatar>
          <div className="flex-1 grid gap-3">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-y border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
            />
            <div className="flex justify-end">
              <Button
                onClick={handlePostComment}
                className="px-6 cursor-pointer py-2 text-sm font-semibold bg-gray-900  text-white rounded-full shadow"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="shadow rounded-lg">
            <CardContent className="flex items-start gap-4 p-6">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.name} />
                <AvatarFallback>{comment.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-50">{comment.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Comments
