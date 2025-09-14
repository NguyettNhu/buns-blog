import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  series?: string
  featured?: boolean
  readingTime: string
  content: string
  publishedAt: Date
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  series?: string
  featured?: boolean
  readingTime: string
  publishedAt: Date
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const stats = readingTime(content)

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          author: data.author,
          tags: data.tags || [],
          series: data.series,
          featured: data.featured || false,
          readingTime: stats.text,
          publishedAt: new Date(data.date),
        } as PostMeta
      })
  )

  return allPostsData
    .filter((post) => post.publishedAt <= new Date())
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      tags: data.tags || [],
      series: data.series,
      featured: data.featured || false,
      readingTime: stats.text,
      content,
      publishedAt: new Date(data.date),
    }
  } catch {
    return null
  }
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export async function getPostsBySeries(series: string): Promise<PostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.series === series)
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const allTags = allPosts.flatMap((post) => post.tags)
  return [...new Set(allTags)]
}

export async function getAllSeries(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const allSeries = allPosts
    .map((post) => post.series)
    .filter(Boolean) as string[]
  return [...new Set(allSeries)]
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.featured)
}