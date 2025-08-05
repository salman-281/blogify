import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

const page  = () => {
  return (
    <div className="container mx-auto py-12 font-sans px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to
          reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Regarding your latest blog post..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." rows={5} required />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
            <CardDescription>You can also reach us through the following channels:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted-foreground">info@yourblog.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-muted-foreground">+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-muted-foreground">123 Blog Street, Suite 456, City, State, 12345</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default page