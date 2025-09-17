import { getAllPosts, getFeaturedPosts } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'


export default async function Home() {
  const featuredPosts = await getFeaturedPosts()
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-4">
          Chào mừng đến với <span className="text-primary">Bun&apos;s Blog</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới lập trình
        </p>
        <Link href="/blog">
          <Button size="lg" className="gap-2">
            Khám phá bài viết <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>


      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8">Bài viết nổi bật</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="card h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-violet-500 text-violet-200">Nổi bật</Badge>
                      {post.series && (
                        <Badge variant="outline">{post.series}</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground ">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time>{formatDate(post.date)}</time>
                      </div>
                      <div className="flex items-center gap-1 ">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}</span>
                      </div>
                      <div className="flex items-center gap-1 ">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 ">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs  bg-[#850865] rounded-2xl">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Bài viết mới nhất</h2>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="card h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <time>{formatDate(post.date)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-[#850865] rounded-2xl">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
