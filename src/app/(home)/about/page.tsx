import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb, Sparkles, Users, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 font-sans md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                About Our Diverse Blog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground dm_sans">
                Exploring the intersections of technology, culture, lifestyle, and beyond. We bring you fresh
                perspectives and insightful content from every corner of the web.
              </p>
              <Link href="/all-blogs" passHref>
                <Button size="lg" className="mt-6 cursor-pointer">
                  Explore Our Blog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans md:text-5xl">Our Mission</h2>
              <p className="text-muted-foreground dm_sans md:text-lg">
                At our core, we believe in the power of diverse narratives. Our mission is to curate and create engaging
                content that transcends traditional categories, offering a unique blend of topics that inform, inspire,
                and entertain. We aim to be your go-to source for thought-provoking articles, practical guides, and
                captivating stories that reflect the multifaceted world we live in.
              </p>
              <p className="text-muted-foreground md:text-lg dm_sans">
                We are committed to fostering a community where curiosity thrives and different viewpoints are
                celebrated.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg"
                width={600}
                height={400}
                alt="Diverse group reading"
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values/Approach Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold font-sans tracking-tighter sm:text-4xl md:text-5xl mb-10">What Makes Us Unique</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="flex flex-col items-center p-6 text-center">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <CardHeader className=" w-full">
                  <CardTitle  className="font-sans">Insightful Content</CardTitle>
                </CardHeader>
                <CardDescription className="dm_sans">Deep dives and fresh perspectives on a wide array of subjects.</CardDescription>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <CardHeader className=" w-full">
                  <CardTitle  className="font-sans">Creative Storytelling</CardTitle>
                </CardHeader>
                <CardDescription  className="dm_sans"> Engaging narratives that bring complex ideas to life.</CardDescription>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardHeader className=" w-full">
                  <CardTitle  className="font-sans">Community Focused</CardTitle>
                </CardHeader>
                <CardDescription  className="dm_sans">Building a space for discussion and shared learning.</CardDescription>
              </Card>
              <Card className="flex flex-col items-center p-6 text-center">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <CardHeader className=" w-full">
                  <CardTitle className="font-sans">Continuous Learning</CardTitle>
                </CardHeader>
                <CardDescription  className="dm_sans">Always evolving with new topics and trends.</CardDescription>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 text-center">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Dive In?</h2>
            <p className="text-muted-foreground dm_sans md:text-lg">
              Explore our latest articles and discover something new. From tech reviews to cultural analyses, we have
              something for everyone.
            </p>
            <Link href="/all-blogs" passHref>
              <Button size="lg" className="mt-6 cursor-pointer">
                Start Reading Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
