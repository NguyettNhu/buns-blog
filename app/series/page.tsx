import { getAllSeries, getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'

export const metadata = {
  title: 'Tất cả Series - Bun\'s Blog',
  description: 'Khám phá các series bài viết trên Bun\'s Blog'
}

export default async function SeriesPage() {
  const allSeries = await getAllSeries()
  const allPosts = await getAllPosts()

  // Đếm số bài viết cho mỗi series
  const seriesCounts = allSeries.map(series => {
    const count = allPosts.filter(post => post.series === series).length
    return { series, count }
  }).sort((a, b) => b.count - a.count)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tất cả Series</h1>
        <p className="text-muted-foreground text-lg">
          Khám phá {allSeries.length} series chủ đề trên blog
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {seriesCounts.map(({ series, count }) => (
          <Link key={series} href={`/series/${series}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  {series}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge variant="secondary">
                  {count} bài viết
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allSeries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Chưa có series nào.</p>
        </div>
      )}
    </div>
  )
}
