import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { type Post } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface PostDetailProps {
  post: Post
}

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mt-2">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        {children}
      </table>
    </div>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="m-0 border-t p-0 even:bg-muted">
      {children}
    </tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {children}
    </td>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4">
      {children}
    </pre>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  ),
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold leading-tight">
            {post.title}
          </CardTitle>
          <CardDescription className="text-lg">
            {post.excerpt}
          </CardDescription>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge variant="secondary" className="hover:bg-accent">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {post.series && (
            <div className="pt-2">
              <Badge variant="outline">
                Series: {post.series}
              </Badge>
            </div>
          )}
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>
        </CardContent>
      </Card>
    </article>
  )
}