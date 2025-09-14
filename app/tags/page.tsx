import { getAllTags, getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'

export const metadata = {
  title: 'Tất cả Tags - Bun\'s Blog',
  description: 'Khám phá các chủ đề trên Bun\'s Blog qua tags'
}

export default async function TagsPage() {
  const allTags = await getAllTags()
  const allPosts = await getAllPosts()
  
  // Đếm số bài viết cho mỗi tag
  const tagCounts = allTags.map(tag => {
    const count = allPosts.filter(post => post.tags.includes(tag)).length
    return { tag, count }
  }).sort((a, b) => b.count - a.count)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Tất cả Tags</h1>
        <p className="text-muted-foreground text-lg">
          Khám phá {allTags.length} chủ đề khác nhau trên blog
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tagCounts.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  {tag}
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

      {allTags.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Chưa có tag nào.</p>
        </div>
      )}
    </div>
  )
}