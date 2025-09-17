
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type PostMeta } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <Clock className="h-4 w-4 ml-2" />
          <span>{post.readingTime}</span>
        </div>
        <CardTitle className="line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:underline"
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          {post.featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`}>
                <Badge variant="outline" className="text-xs hover:bg-accent">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}