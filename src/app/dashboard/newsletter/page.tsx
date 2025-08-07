"use client"

import { useEffect, useState } from "react"
import { getNewsletterEmails } from "@/app/(home)/_actions/action" // Assuming this path is correct
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RiDeleteBinLine, RiLoader4Fill } from "react-icons/ri" // Assuming react-icons/ri is installed
import { Mail, CalendarDays } from "lucide-react" // Using Lucide React for icons

interface NewsletterUser {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}

const Page = () => {
  const [emails, setEmails] = useState<NewsletterUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmails() {
      try {
        const storedEmails = await getNewsletterEmails()
        setEmails(storedEmails.newsletterList)
      } catch (error) {
        console.error("Failed to fetch newsletter emails:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEmails()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-muted-foreground"> <RiLoader4Fill className="animate-spin text-2xl text-orange-500" /></div>
    )
  }

  return (
    <div className="w-full p-4 md:p-10 font-sans">
      <h1 className="p-5 text-2xl font-bold font-sans">New Subscribers: {emails?.length}</h1>
      <div className="border font-sans overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="font-bold bg-gray-100">
              <TableHead className="min-w-[250px]">Email</TableHead>
              <TableHead className="min-w-[200px] hidden md:table-cell">Joined On</TableHead>
              <TableHead className="text-right min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No newsletter subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              emails.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(user.createdAt).toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <RiDeleteBinLine className="h-4 w-4" />
                      <span className="sr-only">Delete subscriber</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Page
