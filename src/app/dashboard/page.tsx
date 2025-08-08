"use client"

import { useEffect, useState } from "react"
import { getUserForDashboard } from "@/app/(home)/_actions/action" // Assuming this path is correct
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, MapPin, Calendar, Laptop, Smartphone, Tablet, CheckCircle, XCircle } from "lucide-react"
import { MdEdit } from "react-icons/md" // Assuming react-icons/md is installed
import { RiDeleteBinLine, RiLoader4Fill } from "react-icons/ri" // Assuming react-icons/ri is installed

interface User {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  deviceType: "Desktop" | "Mobile" | "Tablet"
  location: string
  signupDate: string
  isActive: boolean
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUserForDashboard()
        // Assuming res.users is an array of User objects
        setUsers(res.users)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const getInitials = (name: string) => {
    const words = name.split(" ")
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-lg text-muted-foreground"> <RiLoader4Fill className="animate-spin text-2xl text-orange-500" /></div>
  }

  return (
    <div className="w-full p-4 md:p-10">
      <h1 className="p-5 text-2xl font-bold font-sans">All Users</h1>
      <div className="rounded border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 font-bold px-2 font-sans">
              <TableHead className="min-w-[180px]">User</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="hidden lg:table-cell min-w-[150px]">Signup Date</TableHead>
              <TableHead className="text-right min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id} className="font-sans">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-gray-300">
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <div className="font-semibold text-gray-800">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.isActive ? "default" : "destructive"}
                      className="flex items-center justify-center gap-1"
                    >
                      {user.isActive ? (
                        <>
                          <CheckCircle className="h-3 w-3" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" /> Inactive
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(user.signupDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 cursor-pointer w-8 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      >
                        <MdEdit className="h-4 w-4" />
                        <span className="sr-only">Edit user</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 cursor-pointer hover:bg-red-50 hover:text-red-600"
                      >
                        <RiDeleteBinLine className="h-4 w-4" />
                        <span className="sr-only">Delete user</span>
                      </Button>
                    </div>
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
