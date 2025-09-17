import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ClickableCard } from '@/components/ClickableCard'


export const metadata = {
  title: "Tất cả bài viết - Bun's Blog",
  description: "Danh sách tất cả bài viết trên Bun's Blog",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary drop-shadow-lg">
          Tất cả bài viết
        </h1>
        <p className="text-lg text-muted-foreground">
          Khám phá <span className="text-accent font-semibold">{posts.length}</span> bài viết về lập trình và công nghệ
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ClickableCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            ariaLabel={`Mở bài viết ${post.title}`}
            className="transition-transform duration-300 hover:scale-[1.02]"
          >
            <Card className="card h-full"> {/* dùng style .card galaxy neon */}
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.featured && <Badge className="bg-purple-700/30 text-purple-200">Nổi bật</Badge>}
                  {post.series && (
                    <Link href={`/series/${post.series}`} className="hover:opacity-80">
                      <Badge variant="outline" className="border-purple-400/50 text-purple-200">
                        {post.series}
                      </Badge>
                    </Link>
                  )}
                </div>
                <CardTitle className="line-clamp-2 text-lg font-semibold text-white">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm text-purple-200/80">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-purple-300 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{formatDate(post.date)}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-purple-300 mb-3">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="hover:opacity-90"
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-800/40 text-purple-200 border border-purple-500/40"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ClickableCard>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Chưa có bài viết nào được xuất bản.
          </p>
        </div>
      )}
    </div>
  )
}
