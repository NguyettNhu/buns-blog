import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { PostDetail } from '@/components/post-detail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Không tìm thấy bài viết - Bun\'s Blog'
    }
  }

  return {
    title: `${post.title} - Bun's Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params           
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <PostDetail post={post} />
}