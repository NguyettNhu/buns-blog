import { getAllTags, getPostsByTag } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Hash, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag)
  
  if (posts.length === 0) {
    return {
      title: `Tag không tồn tại - Bun's Blog`
    }
  }

  return {
    title: `Tag: ${decodedTag} - Bun's Blog`,
    description: `Tất cả bài viết về ${decodedTag} trên Bun's Blog (${posts.length} bài viết)`,
  }
}

export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/tags">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Tất cả tags
          </Button>
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <Hash className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-4xl font-bold">{decodedTag}</h1>
        </div>
        
        <p className="text-muted-foreground text-lg">
          {posts.length} bài viết về {decodedTag}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.featured && (
                    <Badge>Nổi bật</Badge>
                  )}
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
                    <Badge 
                      key={tag} 
                      variant={tag === decodedTag ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}