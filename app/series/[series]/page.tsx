import { getPostsBySeries } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Props {
  params: {
    series: string
  }
}

export async function generateMetadata({ params }: Props) {
  const decodedSeries = decodeURIComponent(params.series)
  return {
    title: `Series: ${decodedSeries} - Bun's Blog`,
    description: `Tất cả bài viết thuộc series ${decodedSeries} trên Bun's Blog`
  }
}

export async function generateStaticParams() {
  
  return []
}

export default async function SeriesDetailPage({ params }: Props) {
  const decodedSeries = decodeURIComponent(params.series)
  const posts = await getPostsBySeries(decodedSeries)

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link href="/series">
          <button className="mb-4 flex items-center gap-2 text-accent hover:underline">
            <ArrowLeft className="h-4 w-4" /> Tất cả series
          </button>
        </Link>
        <h1 className="text-3xl font-bold mb-4">Series: {decodedSeries}</h1>
        <p className="text-muted-foreground">Chưa có bài viết nào trong series này.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/series">
        <button className="mb-4 flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft className="h-4 w-4" /> Tất cả series
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-8">Series: {decodedSeries}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="card h-full hover:shadow-lg transition-shadow">
              <CardHeader>
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
                    <Badge key={tag} variant="secondary" className="text-xs bg-purple-800/40 text-purple-200 border border-purple-500/40">
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
