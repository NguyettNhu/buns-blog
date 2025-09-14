import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ClickableCard } from '@/components/ClickableCard'

export const metadata = {
  title: 'Tất cả bài viết - Bun\'s Blog',
  description: 'Danh sách tất cả bài viết trên Bun\'s Blog',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tất cả bài viết</h1>
        <p className="text-muted-foreground text-lg">
          Khám phá {posts.length} bài viết về lập trình và công nghệ
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ClickableCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            ariaLabel={`Mở bài viết ${post.title}`}
            className="hover:shadow-lg transition-shadow"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.featured && <Badge>Nổi bật</Badge>}
                  {post.series && (
                    // series là link thật, hợp lệ vì card ngoài không phải <a>
                    <Link href={`/series/${post.series}`} className="hover:opacity-80">
                      <Badge variant="outline">{post.series}</Badge>
                    </Link>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
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
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`} className="hover:opacity-80">
                      <Badge variant="secondary" className="text-xs">
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

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Chưa có bài viết nào được xuất bản.</p>
        </div>
      )}
    </div>
  )
}
